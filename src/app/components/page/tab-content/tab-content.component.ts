import { Component } from '@angular/core';
import { ActivatedRoute, Router, Scroll } from '@angular/router';

import { PageService } from 'src/app/app.service';
import { Page } from 'src/app/app.interface';
import { GenerateTabURLPipe } from 'src/app/app.pipe';

import { menus } from '../../../data/content.json';

@Component({
  templateUrl: './tab-content.component.html',
  styleUrls: ['../page.component.scss'],
  host: { class: 'tab-component-container' }
})

export class TabContentComponent {
  title;
  content: any = {};
  tabContent: any = [];
  defaultTab = '.';
  tabExist: Boolean = false;

  constructor(
    private route: ActivatedRoute,
    public ps: PageService,
    private router: Router
    ) {

    route.params.subscribe(params => this.title = params['id']);

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
        const generateUrlPipe = new GenerateTabURLPipe();

        if(this.content.showTabs) {
          this.tabExist = true;
          this.tabContent = this.content.pageStructure.find(sub => this.generateUrl(sub.title) === this.title);

          if(this.tabContent === undefined) this.tabContent = this.content.pageStructure[0];
        } else {
          this.tabExist = false;
          this.tabContent = this.content.pageStructure[0];
        }
      }

      // This is for anchor link to work, the root routerLink should be the first tab, or current URL if page has no tabs
      if(this.title === undefined) {
        this.defaultTab = this.content.showTabs ? this.generateUrl(this.content.pageStructure[0].title) : '.';
      }

    });

  }

  generateUrl(url){
    const generateUrlPipe = new GenerateTabURLPipe();
    return generateUrlPipe.transform(url)
  }

  anchorMenu(id){
    id = this.generateUrl(id);
    const elem = document.getElementById(id);
    const wrapper = document.querySelector('main');

    const offset = 144; // sticky nav height + padding
    
    wrapper.scroll({ top: (elem.getBoundingClientRect().top + wrapper.scrollTop - offset), left: 0, behavior: 'smooth' });
  }
}