import { Component } from '@angular/core';

import { PageService } from '../../app.service';
import { Path } from '../../app.interface';

@Component({
  selector: '[navigation-component]',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
  items: Array<Path> = [];

  constructor(private ps: PageService) {
    this.ps.pages.subscribe((items: Array<Path>) => {
      this.items = this.filterEmptyRoutes(items);
      // console.log(this.items)
    });
  }

  filterEmptyRoutes(items: Array<Path>) {
    return items.filter(item => item.url !== 'none');
  };
}
