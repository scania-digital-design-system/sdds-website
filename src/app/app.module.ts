import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { TranslocoRootModule } from './transloco-root.module';
import { CookieService } from 'ngx-cookie-service';

import { AppComponent } from './app.component';

import { Header } from './components/header/header.component';
import { Footer } from './components/footer/footer.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { MainComponent } from './components/main/main.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { CookiesMessage } from './components/cookies-message/cookies-message.component';
import { SearchList } from './components/search-list/search-list.component';
import { SearchService } from './components/search-list/search.service';

@NgModule({
  declarations: [
    AppComponent,
    CookiesMessage,
    NavigationComponent,
    MainComponent,
    StatisticsComponent,
    Header,
    Footer,
    SearchList
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    TranslocoRootModule
  ],
  providers: [
    CookieService,
    SearchService
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
