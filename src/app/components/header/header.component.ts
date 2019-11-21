import { Component, Input } from '@angular/core';

@Component({
  selector: '[header-component]',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() title: String;
}
