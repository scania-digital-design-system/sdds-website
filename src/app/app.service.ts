import { Injectable } from '@angular/core';
import { Route } from '@angular/router';
// import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import { Path } from './app.interface';

import { default as data } from './data/content.json';

@Injectable()
export class PageService {
  private _page: BehaviorSubject<Path> = new BehaviorSubject({});
  private _pages: BehaviorSubject<ReadonlyArray<Path>> = new BehaviorSubject([]);
  private _routes: BehaviorSubject<ReadonlyArray<Route>> = new BehaviorSubject([]);

  public readonly page: Observable<Object> = this._page.asObservable();
  public readonly pages: Observable<ReadonlyArray<Object>> = this._pages.asObservable();
  public readonly routes: Observable<ReadonlyArray<Route>> = this._routes.asObservable();

  constructor(/*private http: HttpClient*/) {
    this.setPages(data);
    // this.http.get('app/content/data.json')
    //   .subscribe((items: Array<Item>) => {
    //     this.setPages(items);
    //   });
  }

  setPage(item: Path) {
    this._page.next(item);
  }
  setPages(items: Array<Path>) {
    this._pages.next(items);
  }
  setRoutes(items: Array<Route>) {
    this._routes.next(items);
  }
}
