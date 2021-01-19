import { Injectable } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';
import { switchMap, debounceTime, shareReplay, delay } from 'rxjs/operators';

import { GenerateTabURLPipe } from 'src/app/app.pipe';
import { menus } from '../../data/content.json';

type Data = any;

@Injectable()
export class SearchService {
  
  private term: Subject<string> = new Subject<string>();
  private generateUrlPipe = new GenerateTabURLPipe();

  finalResults: Observable<Data>;
  searchResults = [];
  resultTemp:any = {}; 
  countFound = 0;

  constructor() {
    this.finalResults = this.term.pipe(
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
    this.countFound = 0;
    
    // Clean white space before and after term
    term = term.toLowerCase().trim();
    
    if(term.length > 0){
      menus.forEach(item => {
        this.findOnPages(item, term)
      })
    }   
    
    return of(this.searchResults).pipe();
  }

  // Recursive function to search inside nested content object
  findOnPages(item, searchTerm){

    // Save url and parent information in temp variable called this.resultTemp
    if(item.hasOwnProperty('parent')){
      let parent = item.parent === null ? item.title : JSON.parse(JSON.stringify(item.parent.title));
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

    // TODO: Improve search logic, right now it search in order of data id of the menus
    //       For example, search for "font" and first result appear is "Getting started".
    //       Should be "Typography" instead. Should add content indexing from content side.

    if(item.hasOwnProperty('__typename') && item.__typename==='ComponentPagePluginTab') {
      const tabUrl = JSON.parse(JSON.stringify(item.title)).toLowerCase();
      this.resultTemp.pageTab = this.generateUrlPipe.transform(tabUrl);
    }

    Object.keys(item).forEach(key => {

      // If item value is an object, call this function again
      if(typeof item[key] === 'object' && item[key]!==null && item.url!=='page-spec') {
        this.findOnPages(item[key], searchTerm);
      }

      // If item is string, and it is inside "Text" or "LeadText",
      // then search the given term
      if(typeof item[key]==='string' && (key=='Text' || key=='LeadText')){
        const searchAsRegEx = new RegExp(searchTerm, 'gmi');
        if (item[key].match(searchAsRegEx)) {
          // Max search results limited to 7 items
            
          if(this.countFound < 7){
            const found = JSON.parse(JSON.stringify(this.resultTemp))
            this.insertToFinalResult(found);
          }
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
        'pageTitle':found.pageTitle,
        'pageTab': found.pageTab
      }]
    };
    let parent;
    let selIndex = -1;

    if(this.searchResults.length === 0) {
      this.countFound++;
      this.searchResults.push(newData)
    } else {
      // Check if parent is already in the searchResults array
      parent = this.searchResults.some((result, index) => {
        // Make sure selIndex is resetted before starting a new search on pageTitle
        selIndex = -1;

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
          this.countFound++;
          this.searchResults[selIndex].searchFound.push({
            'url':found.url,
            'link':found.link,
            'pageTitle':found.pageTitle,
            'pageTab': found.pageTab
          })
        }
      } else {
        this.countFound++;
        this.searchResults.push(newData);
      }
    }
  }

}