import { Component } from '@angular/core';

import { PageService } from '../../app.service';
import { Page, Template } from '../../app.interface';

import { templates } from '../../data/templates.json';
import { menus } from '../../data/content.json';

@Component({
  template:
    templates.map((item: Template) => `
      <div *ngFor='let item of content.text'>
        <ng-template [ngIf]='"${item.id}" == item.template.id' >
          ${item.text}
        </ng-template>
      </div>
    `).join(''),
  styleUrls: ['./page.component.scss']
})
export class PageComponent {
  item: Page;
  titleParent: String;
  content: Object = {};

  constructor(public ps: PageService) {
    this.ps.page.subscribe((item: Page) => {

      if(item.id){
        this.content = menus.find(menu => menu.id === item.id);
      } else if(item.parent) {
        this.content = menus.find(menu => menu.id === item.parent.id);
      } else {
        return;
      }
    });
  }
}