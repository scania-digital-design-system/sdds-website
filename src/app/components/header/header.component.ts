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
  @Input() sentmessage2;
  @Output() menuToggling = new EventEmitter<boolean>();

  //FIXME: disabled search
  // toggleSearch() {
  //   this.searchOpen = !this.searchOpen;
  // }

  toggleMenu() {
    this.menuToggle = !this.menuToggle;

    if(this.menuToggle == true) {
      this.navigationID.classList.add('sdds-nav-open');
      this.sentmessage2 = false;
    } else {
      this.navigationID.classList.remove('sdds-nav-open');
      this.sentmessage2 = true;
    }
  }

}