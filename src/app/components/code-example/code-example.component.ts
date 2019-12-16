import { Component, Input } from '@angular/core';

import { default as allExamples } from '../../data/examples.json';

@Component({
  selector: '[code-example]',
  template: allExamples.map((item: any) => `
    <ng-container *ngFor='let example of examples'>
      <div *ngIf='example === ${item.id}'>
        <strong>${item.title}</strong>
        <figure>${item.text}</figure>
        <div item-toggler text='Toggle code example'>
          <c-code-sample>${item.text}</c-code-sample>
        </div>
      </div>
    </ng-container>
  `).join(''),
  styles: [
    `
      :host > div {
        padding-bottom: 4rem;
      }
    `
  ]
})

export class CodeExampleComponent {
  @Input() examples: Array<Number>;
}