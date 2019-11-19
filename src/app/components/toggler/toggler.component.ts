import { Component, Input } from '@angular/core';

@Component({
  selector: '[item-toggler]',
  templateUrl: './toggler.component.html',
  styleUrls: ['./toggler.component.scss']
})
export class TogglerComponent {
  @Input() text: String;
  @Input() collapsed: Boolean = true;

  id: String = 'a' + Math.round( Math.random() * 1000000000 );
}
