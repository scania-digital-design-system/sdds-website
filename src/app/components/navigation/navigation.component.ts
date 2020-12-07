import { Component } from '@angular/core';

import { PageService } from '../../app.service';
import { Page, Navigation } from '../../app.interface';

@Component({
  selector: '[navigation-component]',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
  // navigations: Array<Navigation> = [];
  firstLevelNav: Navigation;
  externalNav: Navigation;
  // pages: Array<Page> = [];
  activePage = null;
  activeShow: String = 'show';

  constructor(private ps: PageService) {
    // this.ps.pages.subscribe((items: Array<Page>) => this.pages = this.filterEmptyRoutes(items));
    this.ps.navigations.subscribe((navigationMenus: Array<Navigation>) => {
      // this.navigations = navigationMenus;
      this.firstLevelNav = navigationMenus[0];
      this.externalNav = navigationMenus[1];

      console.log(this.firstLevelNav);
      console.log(this.externalNav);
      // this.navigations = items.map(item => item.menus.filter(page => this.filterEmptyRoutes(item.menus)));
    });
  }

  filterEmptyRoutes(pages: Array<Page>) {
    return pages.filter(page => page.url !== 'none');
  };

  id: String = 'a' + Math.round( Math.random() * 10000 );

  preventToggle(e, page) {
    // console.log(page)
    if(page === this.activePage) e.stopPropagation();

    this.activePage = null;
  }

}
