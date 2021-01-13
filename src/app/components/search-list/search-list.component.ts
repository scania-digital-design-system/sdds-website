import { Component } from '@angular/core';

import { PageService } from 'src/app/app.service';

@Component({
  selector: 'sdds-search-list',
  templateUrl:'search-list.component.html',
  styleUrls: ['search-list.component.scss']
})

export class SearchList {

  constructor(private ps: PageService) {
    
  }
}