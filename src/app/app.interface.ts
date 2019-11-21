
export interface Path {
  id?: number;
  url?: string;
  content?: Page;
  items?: Path[];
  parent?: Path;
}
export interface Page {
  id?: number;
  title?: string;
  tag?: string;
  description?: string;
  template?: number;
  examples?: Example[];
  info?: Object[];
}
export interface Example {
  id?: number;
  title?: string;
  text?: string;
}
