
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
  examples?: Item[];
  info?: Object[];
}
export interface Item {
  id?: number;
  title?: string;
  text?: string;
}
