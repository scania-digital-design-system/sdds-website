import { Component, EventEmitter, Output } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { PageService } from './app.service';

@Component({
  selector: '#app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private cookie;
  menuToggleOption: any;
  menuHidden: boolean;

  constructor(private cs: CookieService) {}

  ngOnInit() {
    const cookie = this.cs.get('ConfidentialityAgreement');
    this.setCookie(cookie && JSON.parse(cookie));
  }

  setCookie(cookie) {
    this.cookie = cookie;
  }

  getMenuHidden($event) {
    this.menuHidden = $event
    console.log('app:',this.menuHidden);
  }

}
