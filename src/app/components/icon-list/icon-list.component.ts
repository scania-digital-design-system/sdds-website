import { Component, Input, OnInit } from '@angular/core';
import { saveAs } from 'file-saver';

@Component({
  selector: '[icon-list]',
  templateUrl: './icon-list.component.html',
  styleUrls: ['./icon-list.component.scss']
})

export class IconListComponent implements OnInit {
  @Input() icons: Array<Object>;
  @Input() lastUpdate: Date;
  
  // current icon opened in modal
  currentIcon: Object = {};

  // a value that represents Select All status
  // bind to (ngModel), value will change automatically when checkbox selected / deselected
  isSelectedAll: Boolean = false;

  // checked icons
  checkedIcons: Array<String> = [];

  constructor() {
  }

  ngOnInit() {
    // assign initial state in icons object
    this.icons.map((item) => {
      return item['isSelected'] = false;
    })
  }

  openModal(icon) {
    this.currentIcon = icon;
    // Because of innerHTML, need to have the code-sample here, cannot be rendered from html
    this.currentIcon['code'] = `<c-code-sample><c-icon name="${icon.name}"></c-icon></c-code-sample>`;
  }

  getModalLayout(currentIcon){
    // If description, usage, and restriction is not provided
    // Then modal size = default, icon column = col-md-12
    return currentIcon.description || currentIcon.usage || currentIcon.restriction;
  }

  download(event) {
    // Avoid click bubbling to child element (span and save-icon)
    event.stopPropagation();

    const fileName = event.currentTarget.id;
    const url = `https://raw.githubusercontent.com/scania/scania-theme/master/src/icons/${fileName}.svg`;

    saveAs(url, fileName + '.svg');
  }

  clickIconCheckbox(event) {
    // on checkbox clicked, avoid interfere with action click to open modal
    event.stopPropagation();
  }

  // function to select / deselect all other checkboxes in each icons
  selectAll() {
    this.icons.forEach((item) => {
      item['isSelected'] = this.isSelectedAll;
    })
    
    // get checked items
    this.getCheckedIcons();
  }

  selectIconCheckbox() {
    // on isSelectedAll = true, if unselect one checkbox, change isSelectedAll to false
    this.isSelectedAll = this.icons.every(function(item) {
      return item['isSelected'] == true;
    })

    // get checked items
    this.getCheckedIcons();
  }

  getCheckedIcons() {
    this.checkedIcons = [];
    this.icons.forEach((icon:any) => {
      if(icon.isSelected) {
        this.checkedIcons = [...this.checkedIcons, icon.name]
      }
    })
  }
  
}
