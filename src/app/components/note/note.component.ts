import { Component } from '@angular/core';

import { PageService } from '../../app.service';

@Component({
  selector: 'note-component',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent {
  note: String;

  constructor(private ps: PageService) {
    // Currenlty this note service is only used by IE
    const isIE = /msie\s|trident\/|edge\//i.test(window.navigator.userAgent);
    if(!isIE) return;

    this.ps.note.subscribe((item: any) => {
      this.note = item.description;
    });
  }
}
