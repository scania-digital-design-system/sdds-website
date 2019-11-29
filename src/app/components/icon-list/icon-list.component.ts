import { Component, NgZone, OnInit, OnDestroy } from '@angular/core';

import { PageService } from '../../app.service';

@Component({
  selector: '[icon-list]',
  templateUrl: './icon-list.component.html',
  styleUrls: ['./icon-list.component.scss']
})

export class IconListComponent implements OnInit, OnDestroy {
  icons: Object[];
  subscribeStore;

  constructor(private ps: PageService, private ngZone: NgZone ) { }

  ngOnInit() {
    this.subscribeStore = this.ps.theme.subscribe((item: Object) => {
      this.ngZone.run( () => {
        this.icons = item['icons'];
      });
    });
  }

  ngOnDestroy() {
    this.subscribeStore.unsubscribe();
  }

}