import { Component, Input } from '@angular/core';

@Component({
  selector: 'Content-Header',
  templateUrl: './content-header.component.html',
  styleUrls: ['./content-header.component.scss']
})

export class ContentHeader {
  @Input() pageTitle;
  @Input() categoryTitle;
}