import { Component } from '@angular/core';

import { PageService } from '../../app.service';
// import { Item } from '../../app.interface';

@Component({
  selector: '[navigation-component]',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
  items: Array<any> = [];

  constructor(private ps: PageService) {
    this.ps.pages.subscribe((items: Array<any>) => {
      // this.items = items.filter(item => this.filterEmptyRoutes2(item));
      // By running filterEmptyRoutes on items it is changed globally for some reason...
      // TODO: Figure out how to have deep nested readonly
      // const routes = JSON.parse( JSON.stringify(items) );
      // console.log(items);
      this.items = this.filterEmptyRoutes(items);
      // console.log(this.items)
    });
  }

  // filterEmptyRoutes2(item) {
  //   if(item.children) item.children = item.children.filter(sub => this.filterEmptyRoutes(sub));

  //   return item.path && item.path !== '**' && item.path !== 'none';
  // };

  // filterEmptyRoutes(items) {
  //   return items.filter(item => {
  //     if(item.children) item.children = this.filterEmptyRoutes(item.children);

  //     return item.path && item.path !== '**' && item.path !== 'none';
  //   });
  // };

  filterEmptyRoutes(items) {
    return items.filter(item => item.url !== 'none');
  };
}
