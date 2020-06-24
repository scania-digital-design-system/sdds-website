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

@Pipe({ name: 'dateFormat' })
export class DatePipe implements PipeTransform {

  transform(event:Date): string {
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const fullTime = new Date(event);
    const dd = fullTime.getDate();
    const MMM = months[fullTime.getMonth()];
    const YYY = fullTime.getFullYear();
    const hh = fullTime.getHours();
    const mins = fullTime.getMinutes();
    return  dd + ' ' + MMM + ' ' + YYY+ ' ' + hh + ':' + (mins<10 ? ('0' + mins) : mins);
  }
}

@Pipe({ name: 'generateTabUrl' })
export class GenerateTabURLPipe implements PipeTransform {

  transform(url: String) {
    return url.toLowerCase().replace(/\s/g,'-');
  }
}
