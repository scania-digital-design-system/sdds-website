import { Component, HostBinding } from '@angular/core';

import { SearchService } from './search.service';

@Component({
  selector: 'sdds-search-list',
  templateUrl:'search-list.component.html',
  styleUrls: ['search-list.component.scss']
})

export class SearchList {
  @HostBinding('class.show-search') showSearch: boolean = false;

  constructor(private search: SearchService) {
    search.finalResults.subscribe((results)=>{
      this.showSearch = results.length > 0 ? true : false;
    });
  }
}