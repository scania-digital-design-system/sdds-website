
export interface Page {
  id?: Number;
  url?: String;
  content?: Content;
  items?: Page[];
  parent?: Page;
}
export interface Content {
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
export interface Template {
  id?: Number;
  title?: String;
  sections?: Section[];
}
export interface Section {
  id?: Number;
  title?: String;
  content?: String;
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