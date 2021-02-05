import { Component, Input } from '@angular/core';

@Component({
  selector: 'code-example',
  templateUrl:'code-example.component.html',
  styleUrls: ['code-example.component.scss']
})

export class CodeExampleComponent {
  @Input() example: Object;
  emptyParent: boolean = false;

  showProps(event) {
    // Event for detecting change in the data for the table
    if(event) {
      this.emptyParent = event
    } else {
      this.emptyParent = event;
    }
  }
}