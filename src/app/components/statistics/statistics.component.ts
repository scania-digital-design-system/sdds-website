import { Component, ViewChild, ElementRef } from '@angular/core';

declare let window: any;
declare let gtag: Function;

@Component({
  selector: '[statistics-component]',
  templateUrl: './statistics.component.html'
})
export class StatisticsComponent {
  id: String;

  @ViewChild('script', { static: true }) script: ElementRef;

  constructor() {
    this.id = 'UA-160813649-1';
  }

  ngOnInit() {
    this.createNode();

    window.dataLayer = window.dataLayer || [];
    window.gtag = this.gtag;

    window.gtag('js', new Date());
    window.gtag('config', this.id);
  }

  createNode() {
    const element = this.script.nativeElement;
    const parent = element.parentElement;
    const script = document.createElement('script');

    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + this.id;
    script.innerHTML = element.innerHTML
    parent.parentElement.replaceChild(script, parent);
  }

  gtag(action, type, path=null) {
    window.dataLayer.push(arguments);
  }
}