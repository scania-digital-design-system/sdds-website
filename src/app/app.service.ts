import { Injectable } from '@angular/core';
import { Route } from '@angular/router';
// import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import { Page, Doc } from './app.interface';

import { default as content } from './data/content.json';
import { components as docs } from 'corporate-ui-dev/dist/data/docs.json';

@Injectable()
export class PageService {
  private _page: BehaviorSubject<Page> = new BehaviorSubject({});
  private _pages: BehaviorSubject<Array<Page>> = new BehaviorSubject([]);
  private _routes: BehaviorSubject<Array<Route>> = new BehaviorSubject([]);
  private _docs: BehaviorSubject<Array<Doc>> = new BehaviorSubject([]);

  public readonly page: Observable<Page> = this._page.asObservable();
  public readonly pages: Observable<Array<Page>> = this._pages.asObservable();
  public readonly routes: Observable<Array<Route>> = this._routes.asObservable();
  public readonly docs: Observable<Array<Doc>> = this._docs.asObservable();

  constructor(/*private http: HttpClient*/) {
    this.setPages(content);
    this.setDocs(docs);
    // this.http.get('app/content/data.json')
    //   .subscribe((items: Array<Item>) => {
    //     this.setPages(items);
    //   });
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
}
