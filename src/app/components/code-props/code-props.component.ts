import { Component, Output } from '@angular/core';
import { PageService } from 'src/app/app.service';

@Component({
  selector: '[code-properties]',
  templateUrl: 'code-props.component.html',
  styleUrls: ['code-props.component.scss']
})

export class CodePropsComponent {
  content: any; //Json data from stencil
  component;
  props: object; //Properties of every component
  tagName: string; //Tag name of the component

  constructor(ps: PageService) {
    this.content = ps.docs.source;
  }

  getComponent() {
    //Retriving the component data from Corporate-Ui
    var el = document.querySelectorAll('c-code-sample');
    // TODO: Look into a better way of compare if the component exist
      el.forEach(el => {
        this.component = this.content._value.find(component => {
          if(el.children[0].tagName.toLowerCase() == component.tag) {
            return component;
          }
        })
      })

    if(!this.component) return; // No component was found
    this.getTagName(this.component);
    this.getProps(this.component);
    return true;
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