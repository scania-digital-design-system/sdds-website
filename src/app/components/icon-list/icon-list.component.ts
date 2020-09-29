import { Component, NgZone, Input } from '@angular/core';
import { saveAs } from 'file-saver'

import { PageService } from '../../app.service';

@Component({
  selector: '[icon-list]',
  templateUrl: './icon-list.component.html',
  styleUrls: ['./icon-list.component.scss']
})

export class IconListComponent {
  @Input() icons: Array<Object>;
  @Input() lastUpdate: Date;
  currentIcon: Object = {};

  constructor(private ps: PageService, private zone: NgZone) { }

  openModal(icon) {
    this.currentIcon = icon;
    // Because of innerHTML, need to have the code-sample here, cannot be rendered from html
    this.currentIcon['code'] = `<c-code-sample><c-icon name="${icon.name}"></c-icon></c-code-sample>`;
  }

  download(event) {
    // Avoid click bubbling to child element (span and save-icon)
    event.stopPropagation();

    const fileName = event.currentTarget.id;
    const url = `https://raw.githubusercontent.com/scania/scania-theme/master/src/icons/${fileName}.svg`;

    saveAs(url, fileName + '.svg');
  }

  getModalLayout(currentIcon){
    // If description, usage, and restriction is not provided
    // Then modal size = default, icon column = col-md-12
    return currentIcon.description || currentIcon.usage || currentIcon.restriction;
  }

  
}
