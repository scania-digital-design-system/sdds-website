import { Component } from '@angular/core';

import { PageService } from '../../app.service';
import { Page, Navigation } from '../../app.interface';

@Component({
  selector: '[navigation-component]',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})


export class NavigationComponent {
  pages: Array<Page> = [];
  active: string = 'active';

  constructor(private ps: PageService) {
    this.ps.pages.subscribe((items: Navigation) => {
      this.pages = this.filterEmptyRoutes(items.menus);
    });
  }

  filterEmptyRoutes(pages: Array<Page>) {
    return pages.filter(page => page.url !== 'none');
  };

  id: String = 'a' + Math.round( Math.random() * 10000 );
}
