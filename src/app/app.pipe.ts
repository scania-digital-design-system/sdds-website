import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import marked from 'marked';

@Pipe({ name: 'keepHtml', pure: false })
export class EscapeHtmlPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) { }

  transform(content: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(content);
  }
}

@Pipe({ name: 'markdown', pure: false })
export class MarkdownPipe implements PipeTransform {

  transform(content: string): string {
    return marked(content.replace('\\n', '<br>'));
  }
}
