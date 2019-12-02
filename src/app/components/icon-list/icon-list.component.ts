import { Component, NgZone, OnInit, OnDestroy } from '@angular/core';

import { PageService } from '../../app.service';
import { Theme } from '../../app.interface';

@Component({
  selector: '[icon-list]',
  templateUrl: './icon-list.component.html',
  styleUrls: ['./icon-list.component.scss']
})

export class IconListComponent implements OnInit, OnDestroy {
  icons: Object;
  subscribeStore;

  constructor(private ps: PageService, private zone: NgZone) { }

  ngOnInit() {
    this.subscribeStore = this.ps.theme.subscribe((item: Theme) => {
      // When data is fetched from outside Angular scope, Zone will let angular know about it
      this.zone.run(() => {
        this.icons = item.icons;
      });
    });
  }

  ngOnDestroy() {
    this.subscribeStore.unsubscribe();
  }
}