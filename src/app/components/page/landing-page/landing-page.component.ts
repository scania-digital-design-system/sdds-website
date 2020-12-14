import { Component, Input } from '@angular/core';

@Component({
  selector: 'Landing-Page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['../page.component.scss']
})

export class LandingPage {
  @Input() page;

  constructor() {
  }
  
  clickCard(url){
    window.open(url);
  }
}