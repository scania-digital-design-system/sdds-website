
// TODO: When StencilJS needs to change there setting for readme or we need to always render readme´s
// export * from 'corporate-ui/dist/data/docs';

export interface Navigation {
  id?: String;
  title?: String;
  menus?: Page[];
}
export interface Page {
  id?: String;
  title?: String;
  url?: String;
  content?: Content;
  submenus?: Page[];
  thumbnail?: File;
  parent?: Page;
}
export interface Content {
  id?: String;
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
  id?: String;
  title?: String;
  text?: String;
}
export interface File {
  id?: String;
  url?: String;
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