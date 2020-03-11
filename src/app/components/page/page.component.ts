import { Component } from '@angular/core';

import { PageService } from '../../app.service';
import { Page, Template } from '../../app.interface';

import { templates } from '../../data/templates.json';
import { menus } from '../../data/content.json';

@Component({
  template:
  `<ul class="nav nav-pills" id="myTab">` +
  templates.map((page: Template, index ) => `
    <li class="nav-item">
      <a class='nav-link' data-toggle='tab' [ngClass]="{'active' : '${index}' == 0}" href='#section-${page.id}'> ${page.title}</a>
    </li>
  `).join('')
  + "</ul>" +
  "<div class='tab-content'>" +
  templates.map((page: Template, index) => `
    <section class="tab-pane" [ngClass]="{'active' : '${index}' == 0}" id='section-${page.id}'>
      <div *ngFor='let item of content.text; index'>
        <ng-template [ngIf]='"${page.id}" == item.template.id'>
          ${page.text} {{index}}
        </ng-template>
      </div>
    </section>
  `).join('')
  + '</div>',
  styleUrls: ['./page.component.scss']
})
export class PageComponent {
  content: Object = {};

  constructor(public ps: PageService) {
    this.ps.page.subscribe((page: Page) => {

      // FIXME: Improve how the states are handled for parent and child element
      if(page.id){
        this.content = menus.find(menu => menu.id === page.id);
        // debugger
      } else if(page.parent)  {
        this.content = menus.find(menu => menu.id === page.parent.id);
      } else {
        return;
      }
    });

  }
}