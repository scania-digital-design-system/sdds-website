import { Component, Input } from '@angular/core';

@Component({
  selector: '[code-example]',
  templateUrl:'code-example.component.html'
})

export class CodeExampleComponent {
  @Input() example: Object;
  @Input() toggleCode: Boolean;
}