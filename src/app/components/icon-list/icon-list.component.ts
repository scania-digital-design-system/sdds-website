import { Component, NgZone, Input, OnInit } from '@angular/core';
import { saveAs } from 'file-saver'

import { PageService } from '../../app.service';

@Component({
  selector: '[icon-list]',
  templateUrl: './icon-list.component.html',
  styleUrls: ['./icon-list.component.scss']
})

export class IconListComponent implements OnInit{
  @Input() icons: Array<Object>;
  @Input() lastUpdate: Date;

  filteredIcons: Array<Object>;

  currentIcon: Object = {};

  constructor(private ps: PageService, private zone: NgZone) { }

  ngOnInit() {
    this.filteredIcons = this.icons;
  }

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

  searchIcons(event) {
    let currentData:any = [...this.icons];
    let newData = [];
    
    if(event.target.value !== '') {
      newData = currentData.filter(item => {
        if(item.title) {
          const listItem = item.title.toLowerCase();
          const filter = event.target.value.toLowerCase();
          return listItem.includes(filter);
        }
      })
    } else {
      newData = [...currentData];
    }
    
    this.filteredIcons = [...newData];

  }

  
}
