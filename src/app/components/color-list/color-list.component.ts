import { Component, NgZone, Input, OnInit, OnDestroy } from '@angular/core';

import { PageService } from '../../app.service';
import { Theme } from '../../app.interface';

@Component({
  selector: '[color-list]',
  templateUrl: './color-list.component.html',
  styleUrls: ['./color-list.component.scss']
})
export class ColorListComponent implements OnInit, OnDestroy {
  colors: Object;
  subscribeStore;

  @Input() type: String;
  @Input() classes: String;

  constructor(private ps: PageService, private zone: NgZone) { }

  ngOnInit() {
    this.subscribeStore = this.ps.theme.subscribe((item: Theme) => {
      // When data is fetched from outside Angular scope, Zone will let angular know about it
      this.zone.run(() => {
        this.colors = this.getColors(this.type, item.colors);
      });
    });
  }

  ngOnDestroy() {
    this.subscribeStore.unsubscribe();
  }

  getColors(type, allColors = {}) {
    let colorArr = [];
    Object.entries(allColors).filter(([name, item]: any[]) => {
      if(item.type === type) {
        colorArr = [ ...colorArr, { 'name': name, 'hex': item.hex } ];
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