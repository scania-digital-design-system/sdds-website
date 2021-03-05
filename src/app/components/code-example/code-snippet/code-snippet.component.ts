import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { CodeExampleComponent } from '../code-example.component';
import hljs from 'highlight.js/lib/core';
import xml from 'highlight.js/lib/languages/xml';
import js from 'highlight.js/lib/languages/javascript';
import css from 'highlight.js/lib/languages/css';
import typescript from 'highlight.js/lib/languages/typescript';
import scss from 'highlight.js/lib/languages/scss';
import shell from 'highlight.js/lib/languages/shell';
// import bash from 'highlight.js/lib/languages/bash';


@Component({
  selector: 'code-snippet',
  templateUrl:'code-snippet.component.html',
  styleUrls: ['code-snippet.component.scss']
})

export class CodeSnippetComponent implements AfterViewInit {
  hlObj: any;
  @ViewChild('codeSnippet', {static: false}) elementRef: ElementRef;
  height: boolean;
  toggle: boolean = false;
  hidden: boolean = true;

  constructor(private parent: CodeExampleComponent,private cd: ChangeDetectorRef) {}


  ngAfterViewInit() {
    this.highlighting();
    this.getHeight();
    this.cd.detectChanges();
    //Change detection
  }

  highlighting() {
    //language that can be added, more is avaliable if needed
    hljs.registerLanguage('html', xml);
    hljs.registerLanguage('ts', typescript);
    hljs.registerLanguage('css', css);
    hljs.registerLanguage('js', js);
    hljs.registerLanguage('scss', scss)
    hljs.registerLanguage('shell', shell)
    // hljs.registerLanguage('bash', bash)

    /*
    HighlightjsAuto will automatiaclly detect which
    language the current code block is by priotization list from highlighjs
    class added on the element is the 1th lang detected
    if we need it also has secondary lang set the hlObj object has access to it
    Might want to remove the auto detect and set it from CMS
    */
    this.hlObj = hljs.highlightAuto(this.parent.example.code);
    this.elementRef.nativeElement.innerHTML = this.hlObj.value;
    this.elementRef.nativeElement.classList.add(this.hlObj.language)
  }

  //Get the height of the current code block by length of the new lines
  getHeight() {
    const el = this.elementRef.nativeElement;
    const splitLine = this.parent.example.code.split('\n');

    if(splitLine.length > 8) {
      this.height = true;
    } else {
      this.height = false;
    }
  }

  //Copy function for the code block
  copy() {
    const tempInput = document.createElement('textarea');
    tempInput.value = this.elementRef.nativeElement.innerText;
    document.body.appendChild(tempInput)
    tempInput.select();
    tempInput.setSelectionRange(0, 99999);
    document.execCommand("copy");
    document.body.removeChild(tempInput);
  }

  OnToggle() {
    this.toggle =! this.toggle;
  }
}