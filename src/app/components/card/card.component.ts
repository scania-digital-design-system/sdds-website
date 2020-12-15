import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'sdds-card',
  templateUrl: 'card.component.html',
  styleUrls: ['card.component.scss']
})

export class CardComponent {
  @Input() card: Object;
  @Input() type;

  constructor(
    private router: Router
  ){}

  clickCard(){
    const cardUrl = this.card['url'];
    if(this.card['type'] === 'linkInternal') {
      this.router.navigate([cardUrl]);
    } else {
      window.open(cardUrl);
    }
  }
}