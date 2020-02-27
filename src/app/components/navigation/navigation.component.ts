import { Component } from '@angular/core';

import { PageService } from '../../app.service';
import { Page } from '../../app.interface';

@Component({
  selector: '[navigation-component]',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})


export class NavigationComponent {
  pages: Array<Page> = [];
  active: string = 'active';

  constructor(private ps: PageService) {
    this.ps.pages.subscribe((pages: Array<Page>) => {
      this.pages = this.filterEmptyRoutes(pages);
    });
  }

  filterEmptyRoutes(pages: Array<Page>) {
    return pages.filter(page => page.url !== 'none');
  };

  id: String = 'a' + Math.round( Math.random() * 10000 );
}
