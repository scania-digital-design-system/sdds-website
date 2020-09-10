import { Component, Output, EventEmitter } from '@angular/core';
import { PageService } from 'src/app/app.service';

@Component({
  selector: '[code-properties]',
  templateUrl: 'code-props.component.html',
  styleUrls: ['code-props.component.scss']
})

export class CodePropsComponent {
  content: any; //Json data from stencil
  component: object;
  props: object; //Properties of every component
  tagName: string; //Tag name of the component
  empty: boolean; // If there are no data for the component
  @Output() change: EventEmitter<Boolean> = new EventEmitter<Boolean>(); //Event to detect change in component object

  constructor(ps: PageService) {
    // Getting the documentation for every component
    this.content = ps.docs.source;
    this.getComponent();
  }

  getComponent() {
    //Retriving the component data from Corporate-Ui

    /* TODO: Look into a better way of compare if the web-component exist,
    maybe add labels to what is a webcomponent with props */
    setTimeout(() =>  {
    var el = document.querySelectorAll('c-code-sample');

    el.forEach(el => {
      this.component = this.content._value.find(component => {
        if(el.children[0].tagName.toLowerCase() == component.tag) {
          return component;
        }
      })
    })

    if(!this.component) {
      this.empty = true;
      this.change.emit(this.empty)
    }
    else {
      this.empty = false;
      this.change.emit(this.empty)
      this.getTagName(this.component);
      this.getProps(this.component);
    }
  })
  }

  getTagName(component) {
    // Tag name of specific component
    this.tagName = component.tag
  }

  getProps(component) {
    //Props of specific component
    this.props = component.props
  }
}