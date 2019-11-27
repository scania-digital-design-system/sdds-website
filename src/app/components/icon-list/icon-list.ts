import { Component, NgZone } from '@angular/core';

@Component({
  selector: '[icon-list]',
  templateUrl: './icon-list.html',
  styleUrls: ['./icon-list.scss']
})

export class IconListComponent {
  icons: String[];

  constructor(private ngZone: NgZone ) { }

  ngOnInit() {
    this.icons = window['CorporateUi'].store.getState().icon.items;
    window['CorporateUi'].store.subscribe(() => {
      this.ngZone.run( () => {
        this.icons = window['CorporateUi'].store.getState().icon.items;
      });
    });
  }

}