import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { TitleCasePipe } from '@angular/common';

import { PageService } from './app.service';
import { EscapeHtmlPipe, MarkdownPipe } from './app.pipe';

import { PageComponent } from './components/page/page.component';
import { TogglerComponent } from './components/toggler/toggler.component';
import { ColorListComponent } from './components/color-list/color-list.component';
import { IconListComponent } from './components/icon-list/icon-list.component';

@NgModule({
  declarations: [
    ColorListComponent,
    EscapeHtmlPipe,
    IconListComponent,
    MarkdownPipe,
    PageComponent,
    TogglerComponent
  ],
  entryComponents: [PageComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([])
  ],
  exports: [
    RouterModule,
    TogglerComponent
  ],
  providers: [
    PageService,
    TitleCasePipe
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppRoutingModule {

  constructor(private router: Router, private ps: PageService) {
    this.ps.pages.subscribe(items => {
      const routes = this.contentToRoute(items);

      this.ps.setRoutes(routes);
    });

    this.ps.routes.subscribe(items => {
      // console.log(1, items);

      this.router.resetConfig([
        ...items,
        { path: '**', redirectTo: 'none' }
      ]);
    });
  }

  contentToRoute(items) {
    return items.reduce((accumulator, item, index) => {
      let route:any = { path: item.url, data: item.content, component: PageComponent };

      if(item.items) route.children = this.contentToRoute(item.items);

      let routes = [ route ];

      if(!index) routes.unshift({ path: '', redirectTo: route.path, pathMatch: 'full' });
  
      return accumulator.concat(routes);
    }, []);
  }
}
