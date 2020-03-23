import { Component } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: '[cookies-message]',
  templateUrl: './cookies-message.component.html'
})
export class CookiesMessage {

  detectedLocale='';
  defaultLocale='en';

  constructor(private translocoService: TranslocoService) {
    // get browser language
    this.detectedLocale = this.getUsersLocale(this.defaultLocale);
    this.updateLocale(this.detectedLocale);
  }

  getUsersLocale(defaultValue: string): string {
    if (typeof window === 'undefined' || typeof window.navigator === 'undefined') {
      return defaultValue;
    }
    const wn = window.navigator as any;
    let lang = wn.languages ? wn.languages[0] : defaultValue;
    lang = lang || wn.language || wn.browserLanguage || wn.userLanguage;
    return lang;
  }

  updateLocale(locale){
    // en should support en-GB, en-US, etc
    const lang = locale.substring(0, 2);
    this.translocoService.setActiveLang(lang);
  }
}
