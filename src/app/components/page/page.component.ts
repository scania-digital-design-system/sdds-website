import { Component } from '@angular/core';

import { PageService } from '../../app.service';
import { Path } from '../../app.interface';

import { default as templates } from '../../data/templates.json';

@Component({
  template: templates.map(item => `
    <ng-template [ngIf]='template.id === ${item.id}'>${item.items.map(sub => sub.content).join('')}</ng-template>
  `).join(''),
  styleUrls: ['./page.component.scss']
})
export class PageComponent {
  item: Path;
  template: Object;

  constructor(public ps: PageService) {
    this.ps.page.subscribe((item: Path) => {
      if(!item.id) return;

      // console.log(item);
      this.item = item;
      this.template = this.getTemplate(item.content.template);
    });
  }

  getTemplate(id: Number) {
    return templates.find(item => item.id === id) || {};
  }
}
