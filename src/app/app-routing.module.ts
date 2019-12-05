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
    EscapeHtmlPipe,
    MarkdownPipe,
    PageComponent,
    TogglerComponent,
    ColorListComponent,
    IconListComponent
  ],
  entryComponents: [PageComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([])
  ],
  exports: [
    RouterModule,
    MarkdownPipe,
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

      console.log(1, routes);

      this.router.resetConfig([
        ...routes,
        { path: '**', redirectTo: 'none' }
      ]);

      this.ps.setRoutes(routes);
    });
  }

  contentToRoute(items) {
    return items.reduce((accumulator, item, index) => {
      let route:any = { path: item.url, data: item.content, component: PageComponent };

      if(item.pages) route.children = this.contentToRoute(item.pages);

      let routes = [ route ];

      if(!index) routes.unshift({ path: '', redirectTo: route.path, pathMatch: 'full' });

      return accumulator.concat(routes);
    }, []);
  }
}
