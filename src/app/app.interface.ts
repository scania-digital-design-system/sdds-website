
// TODO: When StencilJS needs to change there setting for readme or we need to always render readme´s
// export * from 'corporate-ui/dist/data/docs';

export interface Page {
  id?: Number;
  url?: String;
  content?: Content;
  pages?: Page[];
  parent?: Page;
}
export interface Content {
  id?: Number;
  title?: String;
  tag?: String;
  description?: String;
  template?: Number;
  examples?: Number[];
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

// TODO: Get this from Corporate UI
export interface Theme {
  colors?: Object;
  components?: Object;
  favicons?: Object;
  icons?: Object;
}

// TODO: Get this from StencilJS
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