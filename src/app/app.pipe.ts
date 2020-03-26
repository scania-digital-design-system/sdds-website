import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import marked from 'marked';

@Pipe({ name: 'keepHtml' })
export class EscapeHtmlPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) { }

  transform(content: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(content);
  }
}

@Pipe({ name: 'split' })
export class SplitPipe implements PipeTransform {
  transform(text: string, divider: string = ' '): string[] {
    const pattern = new RegExp(divider, 'g');
    return text.split(pattern);
  }
}

@Pipe({ name: 'markdown' })
export class MarkdownPipe implements PipeTransform {

  transform(content: string): string {
    return marked(content.replace('\\n', '<br>'));
  }
}

@Pipe({ name: 'sortASC' })
export class SortASCPipe implements PipeTransform {

  transform(list: Array<Object>): Array<Object> {
    return list.sort((a,b) => a['title'] > b['title'] ? 1 : -1)
  }
}