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
    this.getIcons();
    window['CorporateUi'].store.subscribe(() => {
      this.ngZone.run( () => {
        this.getIcons();
      });
    });
  }

  getIcons() {
    const theme = window['CorporateUi'].store.getState().theme;
    const currentTheme = theme.current;
    this.icons = theme.items[currentTheme].icons;
  }

}