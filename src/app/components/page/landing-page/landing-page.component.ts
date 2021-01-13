import { Component, Input } from '@angular/core';

@Component({
  selector: 'Landing-Page',
  templateUrl: './landing-page.component.html'
})

export class LandingPage {
  @Input() page;
}