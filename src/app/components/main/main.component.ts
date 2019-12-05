import { Component, HostBinding } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TitleCasePipe } from '@angular/common';

import { PageService } from '../../app.service';
import { Page, Doc } from '../../app.interface';

import { name } from '../../../../package.json';

@Component({
  selector: '[main-component]',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  @HostBinding('class') class;

  item: Page = { content: {} };
  items: Array<Page>;
  docs: Array<Doc>;
  parent: Page = {};
  // docs: ArrayObject = {};

  constructor(private router: Router, private ps: PageService, private titleCase: TitleCasePipe) {
    this.ps.pages.subscribe((items: Array<Page>) => {
      this.items = items;
    });

    this.ps.docs.subscribe((docs: Array<Doc>) => {
      this.docs = docs;
    });

    this.router.events.subscribe(route => {
      if (route instanceof NavigationEnd) {
        const paths = route.urlAfterRedirects.substr(1).split('?')[0].split('/');

        this.item = this.getPage(this.items, paths);
        this.class = `category-${this.parent.url} page-${this.item.url}`;

        this.item.content.info = (this.docs.find((item: Doc = {}) => item.tag === this.item.content.tag) || {}).props;
        // Is this a bad idea, it might lead to circular references.
        this.item.parent = this.parent;
        // console.log(this.item);

        document.title = this.titleCase.transform(`${name.replace(/-/g, ' ')} | ${this.item.content.title}`);

        this.ps.setPage(this.item);
      }
    });
  }

  getPage(items: Array<Page>, paths: Array<String>) {
    const path = paths.shift();
    const item = items.find(sub => sub.url === path) || {};

    if(item.pages) {
      this.parent = item;

      return this.getPage(item.pages, paths);
    }

    return item;
  }
}
