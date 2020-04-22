import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: '[color-list]',
  templateUrl: './color-list.component.html',
  styleUrls: ['./color-list.component.scss']
})
export class ColorListComponent implements OnInit {
  cleanContent;
  @Input() content: any;

  ngOnInit() {
    const regex = /---(.*?)---/gs;
    this.cleanContent = this.content.replace(regex, this.renderColor);
  }

  renderColor(match, target, string){
    const allColors = target.trim().split('\n');
    let list = [];
    allColors.forEach(color => {
      const [name,value] = color.split(':');
      const newContent = '<li style="background-color:' + value.trim() +'">'+ name.trim() + ':' + value.trim() +'</li>';
      list.push(newContent);
    });
    return '<ul class="color-list">' + list.join('') + '</ul>';
  }

}