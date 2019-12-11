
// TODO: When StencilJS needs to change there setting for readme or we need to always render readme´s
// export * from 'corporate-ui-dev/dist/data/docs';

export interface Page {
  id?: String;
  url?: String;
  content?: Content;
  pages?: Object[];
  parent?: Page;
}
export interface Content {
  id?: String;
  title?: String;
  description?: String;
  template?: String;
  examples?: Example[];
  info?: Object[];
}
export interface Example {
  id?: String;
  title?: String;
  text?: String;
}
export interface Template {
  id?: String;
  title?: String;
  sections?: Section[];
}
export interface Section {
  id?: String;
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