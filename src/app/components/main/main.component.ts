import { Component, HostBinding } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { PageService } from '../../app.service';
// import { Item } from '../../app.interface';

import { components as docs } from 'corporate-ui-dev/.data/docs.json';

@Component({
  selector: '[main-component]',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  @HostBinding('class') class;

  item: any = { content: {} };
  items: Array<Object>;
  parent: Object = {};
  // docs: ArrayObject = {};

  constructor(private router: Router, private ps: PageService) {
    this.ps.pages.subscribe((items: Array<Object>) => {
      this.items = items;
    });

    this.router.events.subscribe(route => {
      if (route instanceof NavigationEnd) {
        const paths = route.urlAfterRedirects.substr(1).split('/');

        this.item = this.getPage(this.items, paths);
        this.class = this.item.url;

        this.item.content.info = (docs.find(item => item.tag === this.item.content.tag) || {})['props'];
        // Is this a bad idea, it might lead to circular references.
        this.item.parent = this.parent;
        // console.log(this.item);

        this.ps.setPage(this.item);
      }
    });
  }

  getPage(items, paths) {
    const path = paths.shift();
    const item = items.find(sub => sub.url === path) || {};

    if(item.items) {
      this.parent = item;

      return this.getPage(item.items, paths);
    }

    return item;
  }
}
