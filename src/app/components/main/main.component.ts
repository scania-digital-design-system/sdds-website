import { Component, HostBinding } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TitleCasePipe } from '@angular/common';

import { PageService } from '../../app.service';
import { Path, Doc } from '../../app.interface';

import { name } from '../../../../package.json';

@Component({
  selector: '[main-component]',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  @HostBinding('class') class;

  item: Path = { content: {} };
  items: Array<Path>;
  docs: Array<Doc>;
  parent: Path = {};
  // docs: ArrayObject = {};

  constructor(private router: Router, private ps: PageService, private titleCase: TitleCasePipe) {
    this.ps.pages.subscribe((items: Array<Path>) => {
      this.items = items;
    });

    this.ps.docs.subscribe((docs: Array<Doc>) => {
      this.docs = docs;
    });

    this.router.events.subscribe(route => {
      if (route instanceof NavigationEnd) {
        const paths = route.urlAfterRedirects.substr(1).split('/');

        this.item = this.getPage(this.items, paths);
        this.class = this.item.url;

        this.item.content.info = (this.docs.find((item: Doc = {}) => item.tag === this.item.content.tag) || {}).props;
        // Is this a bad idea, it might lead to circular references.
        this.item.parent = this.parent;
        // console.log(this.item);

        document.title = this.titleCase.transform(`${name.replace(/-/g, ' ')} | ${this.item.content.title}`);

        this.ps.setPage(this.item);
      }
    });
  }

  getPage(items: Array<Path>, paths: Array<String>) {
    const path = paths.shift();
    const item = items.find(sub => sub.url === path) || {};

    if(item.items) {
      this.parent = item;

      return this.getPage(item.items, paths);
    }

    return item;
  }
}
