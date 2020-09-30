import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { PageService } from 'src/app/app.service';
import { Page } from 'src/app/app.interface';
import { GenerateTabURLPipe } from 'src/app/app.pipe';

import { menus } from '../../../data/content.json';

@Component({
  templateUrl: './tab-content.component.html',
  styleUrls: ['../page.component.scss']
})

export class TabContentComponent {
  title;
  content: any = {};
  tabContent: any = [];

  constructor(
    private route: ActivatedRoute,
    public ps: PageService
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

          this.tabContent = this.content.pageStructure.find(sub => generateUrlPipe.transform(sub.title) === this.title);

          if(this.tabContent === undefined) this.tabContent = this.content.pageStructure[0];
        } else {
          this.tabContent = this.content.pageStructure[0];
        }
      }
    });

  }
}