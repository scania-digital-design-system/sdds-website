import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector:'header-component',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.scss']
})

export class Header {

  searchOpen = false;
  menuToggle = false;
  navigationID = document.getElementById('sdds-sidenavigation');
  @Input() menuHidden;
  @Input() menuHiddenPage;


  //FIXME: disabled search
  // toggleSearch() {
  //   this.searchOpen = !this.searchOpen;
  // }

  getMenuHidden($event) {
    console.log('header:',this.menuHidden);
    this.menuHidden = $event
  }

  //Toggle
  toggleMenu() {
    this.menuToggle = !this.menuToggle;

    // console.log( this.menuToggle)
    if(this.menuToggle == true) {
      //add open menu class
      this.navigationID.classList.add('sdds-nav-open');
    } else if(this.menuToggle == false){

      //Remove open menu class
      this.navigationID.classList.remove('sdds-nav-open');
    }
  }

}