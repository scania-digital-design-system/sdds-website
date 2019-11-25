import { Component } from '@angular/core';

@Component({
  selector: '[icon-list]',
  templateUrl: './icon-list.html',
  styleUrls: ['./icon-list.scss']
})
export class IconListComponent {
  icons: String[];

  ngOnInit() {
    this.icons = window['CorporateUi'].store.getState().icon.items;
  }
}