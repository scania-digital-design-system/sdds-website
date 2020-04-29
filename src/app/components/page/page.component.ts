import { Component } from '@angular/core';

import { PageService } from '../../app.service';
import { Page, Template } from '../../app.interface';

import { templates } from '../../data/templates.json';
import { menus } from '../../data/content.json';

declare let gtag: Function;

/*
TODO: add possbility to send link direkt connected with tab - button#style
TODO: Indexing the tab menu from the database
FIXME: Add disabled state
FIXME: title should fetch from the template not direct in the html, h1 for homepage needs to be removed now
*/

@Component({
  template: `
  <h1 *ngIf="!content.title.includes('home')">{{content.title}}</h1>
  <ul *ngIf="content.contents.length > 1" class="nav" id="myTab">` +
  templates.map((page: Template) => `
    <li *ngIf="templateCheckId(${page.id})" class='nav-item'>
      <a class='nav-link' data-toggle='tab' (click)="tabChange(content, '${page.title}')" [ngClass]="dynamicActiveState(${page.id}, active)" href='#section-${page.id}'> ${page.title} </a>
    </li>
  `).join('')
  + "</ul>" +
  "<div class='tab-content'>" +
  templates.map((page: Template) => `
    <section [ngClass]="dynamicActiveState(${page.id}, active)" class="tab-pane tab-${page.id}" id='section-${page.id}'>
      <div *ngFor='let item of content.contents'>
        <ng-template [ngIf]='"${page.id}" == item.template.id'>${page.text}</ng-template>
      </div>
    </section>
  `).join('')
  + '</div>',
  styleUrls: ['./page.component.scss']
})

export class PageComponent {
  content: any = {};
  templates: any = {};
  active: any;


  constructor(public ps: PageService) {

    ps.page.subscribe((page: Page) => {

      if(Object.keys(page).length == 0){
        return;
      } else {
        if(page.hasOwnProperty('id')){
          this.content = menus.find(menu => menu.id === page.id);
          // For sovling the unique id and title for every template
          this.objFilter();
        } else if(page.hasOwnProperty('parent') && page.parent)  {
          this.content = menus.find(menu => menu.id === page.parent.id);
          // Works the same way as previous if statement
          this.objFilter();

        } else {
          return;
        }
      }
    });
  }

  objFilter() {
    const templateTitleArr = [];
    const templateIdArr = [];

    for(let [key, contentItem] of Object.entries(this.content.contents)) {
      if(!templateTitleArr.includes(templateTitleArr.includes(contentItem['template'].title))) {
        templateTitleArr.push(contentItem['template'].title);
        templateIdArr.push(contentItem['template'].id);
      }
    }
    this.sortContent(templateIdArr);
  }

  // Checking to find unique id for template
  templateCheckId(pageId) {
    let templateid = this.content.contents.find(item => item.template.id == pageId)
    return templateid;
  }

  sortContent(arr) {
    //Sort the template ids for the picked content
    arr.sort();
    // Set active for the first available template
    this.active = arr[0];
  }

/*  ngOnInit() {
   // TODO: Would be nice if we could use this instead. But then we
   // need to figure out a way to let us know when this $ is available

    let $ = window.CorporateUi.$;
    $(() => {
      $('a[data-toggle="tab"]').on('shown.bs.tab', (e) => {
        console.log(
          e.target, // newly activated tab
          e.relatedTarget // previous active tab
        );
        this.tabChange();
      });
    });
  } */


  // Set active class on element
  dynamicActiveState(page, activePage) {
    if(page == activePage){
      return {
        active: true
      }
    } else {
      return {
        active: false
      }
    }
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
}