import { Injectable } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';
import { switchMap, debounceTime, shareReplay, delay } from 'rxjs/operators';

import { menus } from '../../data/content.json';

type Data = any;

@Injectable()
export class SearchService {
  finalResults: Observable<Data>;
  private term: Subject<string> = new Subject<string>();

  searchResults = [];
  resultTemp:any = {}; 

  constructor() { 

    this.finalResults = this.term.pipe(
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
    
    // Clean white space before and after term
    term = term.toLowerCase().trim();
    
    if(term.length > 0){
      menus.forEach(item => {
        this.findOnPages(item, term)
      })
    }   
    
    return of(this.searchResults).pipe(delay(100));
  }

  // Recursive function to search inside nested content object
  findOnPages(item, searchTerm){

    // Save url and parent information in temp variable called this.resultTemp
    if(item.hasOwnProperty('parent')){
      let parent = item.parent === null ? '': JSON.parse(JSON.stringify(item.parent.title));
      const url = (item.parent === null ? '' : item.parent.url + '/') + item.url;
      this.resultTemp = {
        'parent':parent,
        'url': url,
        'link':item.displayLink || item.title,
      }
    }

    // Save page title value to be displayed in the search list
    if(item.hasOwnProperty('content') && item.content !== null) {
      this.resultTemp.pageTitle = JSON.parse(JSON.stringify(item.content.title));
    }

    Object.keys(item).forEach(key => {

      // If item value is an object, call this function again
      if(typeof item[key] === 'object' && item[key]!==null) {
        this.findOnPages(item[key], searchTerm);
      }

      // If item is string, and it is inside "Text" or "LeadText",
      // then search the given term
      if(typeof item[key]==='string' && (key=='Text' || key=='LeadText')){
        const searchAsRegEx = new RegExp(searchTerm, 'gmi');
        if (item[key].match(searchAsRegEx)) {
          const found = JSON.parse(JSON.stringify(this.resultTemp))
          this.insertToFinalResult(found);
        }
      }
    })
  }
  
  // Grouped result according to it's parent
  // It will follow the structure on the left menu
  insertToFinalResult(found){
    let newData = {
      'parent': found.parent,
      'searchFound':[{
        'url':found.url,
        'link':found.link,
        'pageTitle':found.pageTitle
      }]
    };
    let parent;
    let selIndex = -1;

    if(this.searchResults.length === 0) {
      this.searchResults.push(newData)
    } else {
      // Check if parent is already in the searchResults array
      parent = this.searchResults.some((result, index) => {

        // check if page is already indexed inside searchResults
        // We show search result based on page
        // For example, buttons can be found multiple times on one page
        // Avoid displaying multiple pages on the search result list
        if(!result.searchFound.some(page => page.pageTitle === found.pageTitle)) selIndex = index;

        return result.parent === found.parent
      });

      if(parent){
        // If parent found and page is not indexed yet,
        // Add page to the final array according to its parent index
        if(selIndex >= 0) {
          this.searchResults[selIndex].searchFound.push({
            'url':found.url,
            'link':found.link,
            'pageTitle':found.pageTitle
          })
        }
      } else {
        this.searchResults.push(newData)
      }
    }
  }

}