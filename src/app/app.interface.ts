
export interface Path {
  id?: Number;
  url?: String;
  content?: Page;
  items?: Path[];
  parent?: Path;
}
export interface Page {
  id?: Number;
  title?: String;
  tag?: String;
  description?: String;
  template?: Number;
  examples?: Example[];
  info?: Object[];
}
export interface Example {
  id?: Number;
  title?: String;
  text?: String;
}
export interface Doc {
  filePath?: String;
  encapsulation?: String;
  tag?: String;
  docs?: String;
  docsTags?: String[];
  usage?: {};
  props?: Object[];
  methods?: String[];
  events?: String[];
  styles?: String[];
  slots?: String[];
  dependents?: String[];
  dependencies?: String[];
  dependencyGraph?: Object;
}