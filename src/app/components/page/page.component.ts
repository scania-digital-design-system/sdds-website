import { Component } from '@angular/core';

import { PageService } from '../../app.service';
import { Page, Template, Section } from '../../app.interface';

import { data } from '../../data/templates.json';

@Component({
  template: data.templates.map((item: Template) => `
    <ng-template [ngIf]='item.content && item.content.template && item.content.template.id == ${item.id}'>
      ${item.sections.map((sub: Section) => sub.content).join('')}
    </ng-template>
  `).join(''),
  styleUrls: ['./page.component.scss']
})
export class PageComponent {
  item: Page;
  template: Object = {};

  constructor(public ps: PageService) {
    this.ps.page.subscribe((item: Page) => {
      if(!item.id) return;

      this.item = item;
    });
  }
}
