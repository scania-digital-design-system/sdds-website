import { Injectable } from '@angular/core';
import { Route } from '@angular/router';
// import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import { Page, Doc, Navigation } from './app.interface';

import { navigation } from './data/navigation.json';
import { components as docs } from 'corporate-ui/dist/data/docs.json';

@Injectable()
export class PageService {
  private _page: BehaviorSubject<Page> = new BehaviorSubject({});
  private _pages: BehaviorSubject<Navigation> = new BehaviorSubject({});
  private _routes: BehaviorSubject<Array<Route>> = new BehaviorSubject([]);
  private _docs: BehaviorSubject<Array<Doc>> = new BehaviorSubject([]);
  private _theme: BehaviorSubject<Object> = new BehaviorSubject({});
  private _note: BehaviorSubject<Object> = new BehaviorSubject({});

  public readonly page: Observable<Page> = this._page.asObservable();
  public readonly pages: Observable<Navigation> = this._pages.asObservable();
  public readonly routes: Observable<Array<Route>> = this._routes.asObservable();
  public readonly docs: Observable<Array<Doc>> = this._docs.asObservable();
  public readonly theme: Observable<Object> = this._theme.asObservable();
  public readonly note: Observable<Object> = this._note.asObservable();

  constructor(/*private http: HttpClient*/) {
    // this.setPages(content);
    this.setPages(navigation);
    this.setDocs(docs);

    if(window['CorporateUi']) {
      window['CorporateUi'].store.subscribe(() => {
        const current = window['CorporateUi'].store.getState().theme.current;
        this.setTheme(window['CorporateUi'].store.getState().theme.items[current]);
      });
    }

    // this.http.get('app/content/data.json')
    //   .subscribe((items: Array<Item>) => {
    //     this.setPages(items);
    //   });
  }

  setPage(item: Page) {
    this._page.next(item);
  }
  setPages(items: Navigation) {
    this._pages.next(items);
  }
  setPage(item: Page) {
    this._page.next(item);
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
