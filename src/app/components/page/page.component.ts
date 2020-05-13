import { Component } from '@angular/core';

import { PageService } from '../../app.service';
import { Page, Template } from '../../app.interface';

import { templates } from '../../data/templates.json';
import { menus } from '../../data/content.json';

declare let gtag: Function;

/*
TODO: add possbility to send link direkt connected with tab - button#style (URL anchor on tab)
FIXME: title should fetch from the template not direct in the html, h1 for homepage needs to be removed now
*/

@Component({
  template: `
  <h1 *ngIf='!content.title.includes("Home")'>{{content.title}}</h1>
  <ul id='myTab' class='nav' role='tablist' *ngIf='content.showTabs'>
    <li class='nav-item' *ngFor='let pagePart of content.pageStructure; let index = index'>
      <a 
      [ngClass]='("nav-link " + (index===0 ? "active" : "") + (pagePart.active ? "" : "disabled"))'
      data-toggle='tab' [href]='"#tab" + pagePart.id'
      >{{pagePart.title}}</a>
    </li>
  </ul>
  <div class='tab-content'>
    <div [id]='"tab" + pagePart.id'
      *ngFor='let pagePart of content.pageStructure; let index = index'
      [ngClass]='("tab-pane " + (index===0 ? "active" : ""))'
      role='tabpanel'>
      `
      +
      templates.map((page: Template) => `
      <div *ngFor='let item of pagePart.pageContent'>
      <ng-template [ngIf]='"${page.id}" == item.template.id'>${page.text}</ng-template>
      </div>
      `).join('')
      +
      `
      <p class='last-updated'>Last modified {{pagePart.last_updated | dateFormat}}</p>
    </div>
  </div>
  `,
  styleUrls: ['./page.component.scss']
})

export class PageComponent {
  content: any = {};

  constructor(public ps: PageService) {

    ps.page.subscribe((page: Page) => {

      if(Object.keys(page).length == 0) {
        return;
      } else {

        if(page.hasOwnProperty('id')){
          this.content = menus.find(menu => menu.id === page.id);
        } else if(page.hasOwnProperty('parent') && page.parent) {
          this.content = menus.find(menu => menu.id === page.parent.id);
        } else {
          return;
        }
      }
      this.renderLastUpdated();
    });
  }

  renderLastUpdated(){
    this.content.pageStructure.forEach(part => {
      let newTime = new Date(Math.max.apply(null, part.pageContent.map(function(e) {
        console.log(e.content.title, e.content.updated_at)
        return new Date(e.content.updated_at);
      })));
      part.last_updated = newTime;
    });
  }

  tabChange(page, tabTitle) {
    if(typeof gtag === 'undefined') return;

    gtag('send', 'event', {
      eventCategory: 'Page',
      eventAction: 'TabChange',
      eventLabel: page.title,
      eventValue: tabTitle
    });
  }

  // ngOnInit() {
  //  // TODO: Would be nice if we could use this instead. But then we
  //  // need to figure out a way to let us know when this $ is available
  //  document.addEventListener('bsReady', function(event) {      
  //   let $ = window['CorporateUi'].$;    
  //   $(() => {
  //     $('a[data-toggle="tab"]').on('shown.bs.tab', (e) => {
  //       console.log(
  //         e.target, // newly activated tab
  //         e.relatedTarget // previous active tab
  //       );
  //       this.tabChange()
  //     });
  //   });
  // });

  // } 

}