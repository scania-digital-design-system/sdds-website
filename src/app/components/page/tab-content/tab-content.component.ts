import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { PageService } from 'src/app/app.service';
import { Page,Template } from 'src/app/app.interface';
import { GenerateTabURLPipe } from 'src/app/app.pipe';

import { templates } from '../../../data/templates.json';
import { menus } from '../../../data/content.json';

@Component({
  templateUrl:`
    <div class="tab-pane">
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
  `,
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