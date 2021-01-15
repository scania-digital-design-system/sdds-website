import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, of } from 'rxjs';
import { switchMap, debounceTime, shareReplay, delay } from 'rxjs/operators';

import { menus } from '../../data/content.json';
import { navigations } from '../../data/navigation.json';


type Data = any;

@Injectable()
export class SearchService {
  items: Observable<Data>;
  private term: Subject<string> = new Subject<string>();

  searchResults = [];
  parentKey='';
  urlKey:any;

  constructor() { 

    this.items = this.term.pipe(
      debounceTime(250), // only send request when user finish typing, add delay between typing
      switchMap((term: string) => this.loadAndSearch(term)), // switchMap rxjs flatten all observables
      shareReplay(1)
    )
  }

  search(term: string) {
    return this.term.next(term);
  }

  ngOnDestroy(): void {
    this.term.complete();
  }
  
  loadAndSearch(term: string): Observable<Data> {
    this.searchResults=[];
    term = term.toLowerCase();

    menus.forEach(item => {
      this.findOnPages(item, term)
    })
    console.log(this.searchResults)
    return of(this.searchResults).pipe(delay(100));
  }

  findOnPages(item, searchTerm){
    
    if(item.hasOwnProperty('parent') && item.parent!==null){
      this.parentKey=item.parent.title;
      this.urlKey={
        'url':item.url,
        'link':item.displayLink || item.title
      }
    }
    if(item.hasOwnProperty('__typename') && item.__typename === 'ComponentPagePluginTab') {
      this.urlKey['tabTitle'] = item.title;
    }
    Object.keys(item).forEach(key => {
      if(typeof item[key] === 'object' && item[key]!==null) {
        this.findOnPages(item[key], searchTerm);
      }
      if(typeof item[key]==='string' && (key=='Text' || key=='LeadText')){
        let searchAsRegEx = new RegExp(searchTerm, 'gmi');
        if (item[key].match(searchAsRegEx)) {
          console.log(this.urlKey)
          this.searchResults = [...this.searchResults, this.urlKey]
        }
      }
    })
  }

}