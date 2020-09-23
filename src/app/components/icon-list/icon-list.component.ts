import { Component, NgZone, OnInit, OnDestroy, Input } from '@angular/core';

import { PageService } from '../../app.service';
import { Theme } from '../../app.interface';

@Component({
  selector: '[icon-list]',
  templateUrl: './icon-list.component.html',
  styleUrls: ['./icon-list.component.scss']
})

export class IconListComponent implements OnInit {
  allIcons: Array<String> = [];
  // @Input() icons: String;
  @Input() icons: Array<Object>;
  category: String;
  currentIcon: Object = {};

  constructor(private ps: PageService, private zone: NgZone) { }

  ngOnInit() {
    // list all icons solution
    // remove whitespaces
    // this.icons=this.icons.trim();
    // assign allIcons into array
    // this.allIcons = this.icons.split('\n');
    // allIcons[0]: "category=xyz" - remove category from array
    // this.allIcons.shift();
  }

  openModal(icon) {
    this.currentIcon = icon;
    this.currentIcon['code'] = `<c-code-sample><c-icon name="${icon.name}"></c-icon></c-code-sample>`;
  }
}