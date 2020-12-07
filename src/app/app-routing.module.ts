import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { TitleCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PageService } from './app.service';
import { EscapeHtmlPipe, SplitPipe, MarkdownPipe, SortASCPipe, DatePipe, GenerateTabURLPipe } from './app.pipe';

import { PageComponent } from './components/page/page.component';
import { ColorListComponent } from './components/color-list/color-list.component';
import { IconListComponent } from './components/icon-list/icon-list.component';
import { TabContentComponent } from './components/page/tab-content/tab-content.component';
import { CodeExampleComponent } from './components/code-example/code-example.component';
import { CodePropsComponent } from './components/code-props/code-props.component';
import { ContentHeader } from './components/content-header/content-header.component';

@NgModule({
  declarations: [
    DatePipe,
    EscapeHtmlPipe,
    SplitPipe,
    SortASCPipe,
    MarkdownPipe,
    GenerateTabURLPipe,
    PageComponent,
    TabContentComponent,
    ColorListComponent,
    IconListComponent,
    CodeExampleComponent,
    CodePropsComponent,
    ContentHeader
  ],
  entryComponents: [
    PageComponent,
    TabContentComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([])
  ],
  exports: [
    RouterModule,
    DatePipe,
    MarkdownPipe,
    SortASCPipe
  ],
  providers: [
    PageService,
    TitleCasePipe
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppRoutingModule {

  constructor(private router: Router, private ps: PageService) {
    this.ps.pages.subscribe(menus => {
      const routes = this.contentToRoute(menus);

      this.router.resetConfig([
        ...routes,
        { path: '**', redirectTo: '/home' }
      ]);

      this.ps.setRoutes(routes);
    });
  }

  contentToRoute(menus) {
    return menus.reduce((accumulator, menu) => {
      let route:any;

      // if(menu.submenus && menu.submenus.length >= 1) {
      //   let firstSubMenu = `${menu.url}/${menu.submenus[0].url}`
      //  console.log('menu with submenu - ', firstSubMenu);
      // //  route = { path: firstSub }
      // } else if(menu.submenus) {
        
      //   console.log('menu without sub - ', menu.url)
      // } else {
      //   console.log('submenu - ', menu.url)
      // }

      if(!menu.submenus) {
        route = { path: menu.url }
        console.log('submenu',route)
        route.children = [
          { path: '', component: TabContentComponent },
          { path: ':id', component: TabContentComponent }
        ];
      } else {
        route = { path: menu.url, component: PageComponent };
        console.log('main manu',route)
      }

      if(menu.submenus) {
        route.children = this.contentToRoute(menu.submenus);
      }

      let routes = [ route ];

      return accumulator.concat(routes);
    }, []);
  }
}