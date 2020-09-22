import { Component, NgZone, OnInit, OnDestroy, Input } from '@angular/core';

import { PageService } from '../../app.service';
import { Theme } from '../../app.interface';

@Component({
  selector: '[icon-list]',
  templateUrl: './icon-list.component.html',
  styleUrls: ['./icon-list.component.scss']
})

export class IconListComponent implements OnInit {
  icons: Array<String> = [];
  @Input() content: String;
  category: String;
  subscribeStore;

  constructor(private ps: PageService, private zone: NgZone) { }

  ngOnInit() {
    // remove whitespaces
    this.content=this.content.trim();

    // assign icons into array
    this.icons = this.content.split('\n');
    // icons[0]: "category=xyz" - remove category from array
    this.icons.shift();
    
  }
}