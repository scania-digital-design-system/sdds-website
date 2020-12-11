import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

import { PageService } from '../../app.service';
import { Page } from '../../app.interface';

import { menus } from '../../data/content.json';

declare let gtag: Function;

@Component({
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})

export class PageComponent implements OnInit{
  content: any = {};
  tabContent: any = {};
  lastUpdate;
  tabActive;
  parent;

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
          this.parent = page.parent.title;
        } else if(page.hasOwnProperty('parent') && page.parent) {
          this.content = menus.find(menu => menu.id === page.parent.id);
          // If page nested inside parent then show content (for example Definitions, Typography, etc.)
          this.tabContent = this.content.pageStructure[0];
          this.parent = page.title;
        } else {
          return;
        }
      }

      this.renderLastUpdated();
    });
  }

  ngOnInit() {

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