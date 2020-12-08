import { Injectable } from '@angular/core';
import { Route } from '@angular/router';
// import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import { Page, Doc, Navigation } from './app.interface';

import { navigations } from './data/navigation.json';
import { components as docs } from '@scania-sdds/components/dist/collection/custom-elements.json';

@Injectable()
export class PageService {
  private _navigations: BehaviorSubject<Array<Navigation>> = new BehaviorSubject([]);
  private _page: BehaviorSubject<Page> = new BehaviorSubject({});
  private _pages: BehaviorSubject<Array<Page>> = new BehaviorSubject([]);
  private _routes: BehaviorSubject<Array<Route>> = new BehaviorSubject([]);
  private _docs: BehaviorSubject<Array<Doc>> = new BehaviorSubject([]);
  private _theme: BehaviorSubject<Object> = new BehaviorSubject({});
  private _note: BehaviorSubject<Object> = new BehaviorSubject({});

  public readonly navigations: Observable<Array<Navigation>> = this._navigations.asObservable();
  public readonly page: Observable<Page> = this._page.asObservable();
  public readonly pages: Observable<Array<Page>> = this._pages.asObservable();
  public readonly routes: Observable<Array<Route>> = this._routes.asObservable();
  public readonly docs: Observable<Array<Doc>> = this._docs.asObservable();
  public readonly theme: Observable<Object> = this._theme.asObservable();
  public readonly note: Observable<Object> = this._note.asObservable();

  constructor(/*private http: HttpClient*/) {
    // this.setPages(content);
    this.setNavigations(navigations);
    // this.setPages(main);
    this.setDocs(docs);

    this.navigations.subscribe(items => {
      let pages = [];
      items.map(item => pages = [ ...pages, ...item.menus ]);
      this.setPages(pages);
    });

    if(window['CorporateUi']) {
      
      window['CorporateUi'].store.use({set: (function(){
        const current = window['CorporateUi'].store.get('theme').current;
        this.setTheme(window['CorporateUi'].store.get('theme').current);
      }).bind(this)});
    }

    // this.http.get('app/content/data.json')
    //   .subscribe((items: Array<Item>) => {
    //     this.setPages(items);
    //   });
  }

  setNavigations(items: Array<Navigation>) {
    this._navigations.next(items);
  }
  setPage(item: Page) {
    this._page.next(item);
  }
  setPages(items: Array<Page>) {
    this._pages.next(items);
  }
  setRoutes(items: Array<Route>) {
    this._routes.next(items);
  }
  setDocs(docs: Array<Doc>) {
    this._docs.next(docs);
  }
  setNote(note: Object) {
    this._note.next(note);
  }
  setTheme(theme: Object) {
    this._theme.next(theme);
  }
}
