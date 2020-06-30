import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { PageService } from '../../app.service';
import { Page, Template } from '../../app.interface';

import { templates } from '../../data/templates.json';
import { menus } from '../../data/content.json';

declare let gtag: Function;

@Component({
  template:`
  <h1 class='page-title'>{{content.title}}</h1>
  <ul id='myTab' class='nav' role='tablist' *ngIf='content.showTabs'>
  <li class='nav-item' *ngFor='let pagePart of content.pageStructure; let index = index'>
      <a 
      [ngClass]='("nav-link " + (index === 0 && tabActive ? "active" : "") +(pagePart.active ? "" : "disabled"))'
      data-toggle='tab'
      routerLinkActive="active"
      [routerLink]="content.url + '/' + (pagePart.title | generateTabUrl)"
      >{{pagePart.title}}</a>
  </li>
  </ul>

  <div class='tab-content'>
    <router-outlet></router-outlet>
    <div class="tab-pane show active" *ngIf="tabContent.length > 1 || tabContent!==undefined">
    `
    +
    templates.map((page: Template) => `
    <ng-container *ngFor='let item of tabContent.pageContent'>
      <ng-template [ngIf]='"${page.id}" == item.template.id'>
        <section *ngFor="let section of item.content.sections">${page.text}</section>
      </ng-template>
    </ng-container>
    `).join('')
    +
    `
    </div>
    <p class='last-updated'>Last modified {{lastUpdate | dateFormat}}</p>
  </div>
  `,
  styleUrls: ['./page.component.scss']
})

export class PageComponent {
  content: any = {};
  tabContent: any = {};
  lastUpdate;
  tabActive;

  constructor(public ps: PageService, private route: Router) {

    ps.page.subscribe((page: Page) => {
      // If URL is default page then show first tab as active (for example components/badge/)
      this.tabActive = this.route.url.split('/').length === 3 ? true : false;

      if(Object.keys(page).length == 0) {
        return;
      } else {

        if(page.hasOwnProperty('id')){
          this.content = menus.find(menu => menu.id === page.id);
          // If page is not a parent and tabs not exist then show content (for example Home, Support, Contribution)
          this.tabContent = page.parent.id===undefined && !this.content.showTabs ? this.content.pageStructure[0] : [];

        } else if(page.hasOwnProperty('parent') && page.parent) {
          this.content = menus.find(menu => menu.id === page.parent.id);
          // If page nested inside parent then show content (for example Definitions, Typography, etc.)
          this.tabContent = this.content.pageStructure[0];
        } else {
          return;
        }
      }
      this.renderLastUpdated();
    });
    
  }

  renderLastUpdated(){
    let newTime;
    this.content.pageStructure.forEach(part => {
      if(part.pageContent.length > 0) {
         newTime = new Date(Math.max.apply(null, part.pageContent.map(function(data) {
          return new Date(data.content.updated_at);
        })));
      }
      
      this.lastUpdate = newTime;
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