import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: '#app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private cookie;
  menuHidden: boolean; // hide menu from the beginning

  constructor(private cs: CookieService) { }

  ngOnInit() {
    const cookie = this.cs.get('ConfidentialityAgreement');
    this.setCookie(cookie && JSON.parse(cookie));
  }

  setCookie(cookie) {
    this.cookie = cookie;
  }

  getMenuHidden($event) {
    console.log('app: ', $event);
    this.menuHidden = $event;
  }

  handleToggleHeader($event) {
    console.log('event toggle from header ', $event);
    this.menuHidden = false;
  }


}
