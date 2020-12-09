import { Component } from '@angular/core';

@Component({
  selector:'header-component',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.scss']
})

export class Header {

  searchOpen = false;

  toggleSearch() {
    this.searchOpen = !this.searchOpen;
  }

}