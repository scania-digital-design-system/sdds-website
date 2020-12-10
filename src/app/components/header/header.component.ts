import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

@Component({
  selector:'header-component',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.scss']
})

export class Header implements OnChanges {

  searchOpen = false;
  menuToggle = false;
  navigationID = document.getElementById('sdds-sidenavigation');
  @Input() menuHidden;
  @Output() menuTogglingEvent = new EventEmitter<boolean>();

  //FIXME: disabled search
  // toggleSearch() {
  //   this.searchOpen = !this.searchOpen;
  // }

  ngOnChanges(changes: SimpleChanges) {
    console.log('changes ', changes)
    if(changes.menuHidden.currentValue == true){
      this.menuToggle = false;
    }
  }

  handleEvent(event){
    console.log('header ', event)
  }

  toggleMenu() {
    this.menuToggle = !this.menuToggle;

    // console.log(this.menuHidden == true && this.menuToggle == true);
    // console.log(this.menuHidden, this.menuToggle)

    if(this.menuToggle == true) {

      this.menuTogglingEvent.emit(this.menuToggle);

      //add open menu class
      this.navigationID.classList.add('sdds-nav-open');
    } else {
      this.menuTogglingEvent.emit(this.menuToggle)

      //Remove open menu class
      this.navigationID.classList.remove('sdds-nav-open');
    }
  }

}