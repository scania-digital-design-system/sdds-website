import { Component, Input, NgZone } from '@angular/core';

@Component({
  selector: '[color-list]',
  templateUrl: './color-list.html',
  styleUrls: ['./color-list.scss']
})
export class ColorListComponent {
  colors: String[];
  @Input() type: String;
  @Input() classes: String;

  constructor(private ngZone: NgZone ) { }

  ngOnInit() {
    this.colors = this.getColors(this.type);
    this.ngZone.run( () => {
      this.colors = this.getColors(this.type);
    });
  }

  getColors(type) {
    const allColors = window['CorporateUi'].store.getState().color.items;
    let colorArr = []
    Object.entries(allColors).filter(([name, item]) => {
      if(item['type'] === type) {
       colorArr=[...colorArr, {'name':name,'hex': item['hex']}]
      }
    });
    return colorArr;
  }

  renderColor(name, hex) {
    const cssVar = `var(--${name})`;
    const supportCssVar = window['CSS'] && window['CSS'].supports('background-color', cssVar);

    return supportCssVar ? cssVar : hex;
  }
}