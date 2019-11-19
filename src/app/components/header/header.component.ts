import { Component, Input } from '@angular/core';

// import { environment } from 'src/environments/environment';

// const { namespace: ns } = environment;

@Component({
  // selector: `${ns}-header`,
  selector: '[header-component]',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() title: String;
}
