import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

import { SearchService } from '../search-list/search.service';

@Component({
  selector:'header-component',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.scss']
})

export class Header implements OnChanges, OnInit {

  searchOpen = false;
  menuToggle = false;
  navigationID = document.getElementById('sdds-sidenavigation');
  @Input() menuHidden;
  @Output() menuTogglingEvent = new EventEmitter<boolean>();

  constructor(private searchService: SearchService, private router:Router) {
    this.router.events.subscribe(route => {
      if (route instanceof NavigationEnd) {
        this.searchService.search('');
        this.searchTerm = '';
        this.toggleSearch();
      }
    })
  }

  searchTerm = '';

  ngOnInit() {
    this.searchService.search(this.searchTerm);
  }

  onSearchTermChange(): void {
    this.searchService.search(this.searchTerm);
  }  

  toggleSearch() {
    this.searchOpen = !this.searchOpen;
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes.menuHidden.currentValue == true){
      this.menuToggle = false;
    }
  }

  toggleMenu() {
    this.menuToggle = !this.menuToggle;

    // console.log( this.menuToggle)
    if(this.menuToggle == true) {
      this.navigationID.classList.add('sdds-nav-open');

      //add open menu class
      this.menuTogglingEvent.emit(this.menuToggle);
    } else if(this.menuToggle == false){
      this.menuTogglingEvent.emit(this.menuToggle);

      //Remove open menu class
      this.navigationID.classList.remove('sdds-nav-open');
    }
  }

}