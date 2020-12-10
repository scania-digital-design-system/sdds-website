import { Component, EventEmitter, Output } from '@angular/core';
import { NavigationStart, Router} from '@angular/router';

import { PageService } from '../../app.service';
import { Navigation } from '../../app.interface';

@Component({
  selector: '[navigation-component]',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})

export class NavigationComponent {
  firstLevelNav: Navigation;
  externalNav: Navigation;
  id = 'a' + Math.round( Math.random() * 10000 );
  toggle: boolean[] = [];
  currentUrl: string;
  routerState: any;
  navigationID = document.getElementById('sdds-sidenavigation');

  @Output() hideMenuEvent = new EventEmitter<boolean>();

  hideMenu() {
    // console.log('Hiding Menu',this.menuHidden)
    this.hideMenuEvent.emit(false);
    this.hideMenuEvent.emit(true);
    this.navigationID.classList.remove('sdds-nav-open');
  }

  constructor(private ps: PageService, private router: Router) {
    //Get the whole navigation
    this.ps.navigations.subscribe((navigationMenus: Array<Navigation>) => {
      this.firstLevelNav = navigationMenus[0];
      this.externalNav = navigationMenus[1];
    });

    // Get current route
    this.routerState = this.router.events.subscribe((routeEvent: NavigationStart) => {
      if(routeEvent instanceof NavigationStart) {
        this.currentUrl = routeEvent.url
      }
      this.setToggle();
    })
  }

  //Intial value for all toggles states
  setToggle() {
    this.firstLevelNav.menus.forEach(menu => {
      //default toggle is closed/false
      this.toggle[this.id + menu.id] = false;

      //If route is active set toggle as open(true)
      if(menu.url == this.currentUrl.split('/')[1]) {
        this.toggle[this.id + menu.id] = true;
      }
    });

    //To keep of toggle open(true) when switching route
    this.routerState.unsubscribe();
  }

  useToggle(menu, clickId) {
    // Switch toggle state on click
    this.toggle[clickId + menu.id] = !this.toggle[clickId + menu.id];
  }

}
