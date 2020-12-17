import { Component } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';

import { PageService } from 'src/app/app.service';
import { Navigation } from '../../app.interface';

@Component({
  selector: 'sdds-footer',
  templateUrl:'footer.component.html',
  styleUrls: ['footer.component.scss']
})

export class Footer {
  routerState: any;
  footerNav;

  constructor(private ps: PageService, private router: Router) {
    //Get the whole navigation
    this.ps.navigations.subscribe((navigationMenus: Array<Navigation>) => {
      this.footerNav = navigationMenus[2];
    });
  }
}