import { Component } from '@angular/core';

import { SearchService } from './search.service';

@Component({
  selector: 'sdds-search-list',
  templateUrl:'search-list.component.html',
  styleUrls: ['search-list.component.scss']
})

export class SearchList {

  constructor(private search: SearchService) {

  }
}