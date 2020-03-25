import { Component, Input } from '@angular/core';

@Component({
  selector: 'modal-component',
  host: {
    'class': "modal fade",
    'tabindex': "-1",
    'role': "dialog",
    'aria-labelledby': "exampleModalLabel",
    'aria-hidden': "true",
  },
  templateUrl:'modal.component.html'
})

export class ModalComponent {
  @Input() size: String;
}