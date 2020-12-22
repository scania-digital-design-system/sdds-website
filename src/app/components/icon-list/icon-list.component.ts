import { Component, Input, OnInit } from '@angular/core';
import { saveAs } from 'file-saver';
import * as JSZip from 'jszip';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: '[icon-list]',
  templateUrl: './icon-list.component.html',
  styleUrls: ['./icon-list.component.scss']
})

export class IconListComponent implements OnInit {
  @Input() icons: Array<Object>;
  @Input() lastUpdate: Date;
  @Input() category: String;

  filteredIcons: Array<Object>;

  // current icon opened in modal
  currentIcon: Object = {};

  // a value that represents Select All status
  // bind to (ngModel), value will change automatically when checkbox selected / deselected
  isSelectedAll: Boolean = false;

  checkedIcons: Array<String> = [];
  downloading: Boolean = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    // assign initial selected state in icons object
    this.icons.map((item) => {
      return item['isSelected'] = false;
    })
    this.filteredIcons = this.icons;
  }

  openModal(icon) {
    this.currentIcon = icon;
    // Because of innerHTML, need to have the code-sample here, cannot be rendered from html
    this.currentIcon['code'] = `<c-icon name="${icon.name}"></c-icon>`;
  }

  getModalLayout(currentIcon) {
    // If description, usage, and restriction is not provided
    // Then modal size = default, icon column = col-md-12
    return currentIcon.description || currentIcon.usage || currentIcon.restriction;
  }

  generateIconUrl(name) {
    //FIXME: Fix naming in AWS to be used instead of github
    return `https://raw.githubusercontent.com/scania-digital-design-system/sdds/master/theme/light/src/icons/${name}.svg`
  }

  download(event) {
    // download single SVG file from icon modal
    // Avoid click bubbling to child element (span and save-icon)
    event.stopPropagation();

    const fileName = event.currentTarget.id;
    const url = this.generateIconUrl(fileName)

    saveAs(url, fileName + '.svg');
  }

  clickIconCheckbox(event) {
    // on checkbox clicked, avoid interfere with open modal action
    event.stopPropagation();
  }

  getCheckedIcons() {
    this.checkedIcons = [];
    this.icons.forEach((icon: any) => {
      if (icon.isSelected) {
        this.checkedIcons = [...this.checkedIcons, icon.name]
      }
    })
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
    this.isSelectedAll = this.icons.every(function (item) {
      return item['isSelected'] == true;
    })

    // get checked items
    this.getCheckedIcons();
  }

  removeIcon(icon) {
    this.checkedIcons = this.checkedIcons.filter((item) => {
      return item != icon;
    })
    this.icons.forEach((item: any) => {
      if (item.name === icon) {
        item.isSelected = false;
        this.isSelectedAll = false;
      }
    })
  }

  downloadZip() {
    const zip = new JSZip.default();
    let url;
    let waiting = this.checkedIcons.length;
    this.downloading = true;

    this.checkedIcons.forEach(async (icon) => {

      url = this.generateIconUrl(icon);
      const content = await this.loadSvgData(url);
      const blobFile: any = new Blob([content.text], { type: 'image/svg' });

      zip.file(icon + '.svg', blobFile);

      // make sure all icons are downloaded, then save as zip
      waiting--;
      if (waiting === 0) {
        this.saveZip(zip);
      }
    })
  }

  async loadSvgData(url: string) {
    const res = await this.http.get(url).toPromise().catch((err: HttpErrorResponse) => {
      const error = err.error;
      return error;
    });
    return res;
  }

  saveZip(zip) {
    const self = this;
    zip.generateAsync({ type: "blob" })
      .then(function (content) {
        self.downloading = false;
        saveAs(content, "scania-icons.zip");
      })
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
