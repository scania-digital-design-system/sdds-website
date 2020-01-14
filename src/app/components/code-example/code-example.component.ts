import { Component, Input } from '@angular/core';

import { default as allExamples } from '../../data/examples.json';

@Component({
  selector: '[code-example]',
  templateUrl:'code-example.component.html'
})

export class CodeExampleComponent {
  @Input() exampleId: Number;
  @Input() toggleCode: Boolean;
  content;

  ngOnInit(){
    this.content = allExamples.find(ex => ex.id == this.exampleId) || {}
  }
}