import { Component, Input, OnInit, ɵConsole } from '@angular/core';

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
      const [colorValue, text] = color.split(',');
      const [name,value] = colorValue.split(':');
      const [label, textColor] = text.split(':');
      let newContent = `
        <li
          class='${textColor.trim()}'
          style='background-color:${value.trim()};'>
          <span class='name'>${name.trim()}</span>
          <span class='value'>${value.trim()}</span>
        </li>
      `;
      newContent = newContent.trim();
      list.push(newContent);
    });
    return '<ul class="color-list">' + list.join('') + '</ul>';
  }

}