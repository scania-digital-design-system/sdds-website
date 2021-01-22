import { Component, Output, EventEmitter, Input } from '@angular/core';
import { PageService } from 'src/app/app.service';


@Component({
  selector: '[code-properties]',
  templateUrl: 'code-props.component.html',
  styleUrls: ['code-props.component.scss']
})

export class CodePropsComponent {
  @Input() currentComponent; //Current Component
  @Output() change: EventEmitter<Boolean> = new EventEmitter<Boolean>(); //Event to detect change in component object
  componentDocs: any; //Json data from stencil
  component: any; //Specific component
  props: object; //Properties of every component
  tagName: string; //Tag name of the component
  empty: boolean; // If there are no data for the component

  constructor(ps: PageService) {
    //Documentation for every component
    this.componentDocs = ps.docs.source;
  }


  ngOnInit(){
   //Retriving the component data from @scania/components
    this.component = this.componentDocs._value.find(component => {
      if(this.currentComponent.componentTag && component.tag == this.currentComponent.componentTag.toLowerCase()) {
        return component;
      }
    })
    if(!this.component) {
      this.empty = true;
      this.change.emit(this.empty)
    }
    else {
      this.empty = false;
      this.change.emit(this.empty)
      this.tagName = this.component.tag
      this.props = this.component.props
    }
  }
}