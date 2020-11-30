import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { TranslocoRootModule } from './transloco-root.module';
import { CookieService } from 'ngx-cookie-service';

import { AppComponent } from './app.component';

import { Header } from './components/header/header.component'
import { NavigationComponent } from './components/navigation/navigation.component';
import { MainComponent } from './components/main/main.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { CookiesMessage } from './components/cookies-message/cookies-message.component';

@NgModule({
  declarations: [
    AppComponent,
    CookiesMessage,
    NavigationComponent,
    MainComponent,
    StatisticsComponent,
    Header
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    TranslocoRootModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
