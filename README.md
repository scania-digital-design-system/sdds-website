# Scania Digital Design System

Visit our Design System at [Digitaldesign.scania.com](https://digitaldesign.scania.com/)


## How to get started with Corporate-Ui and Scania-theme

For more information how to contribute [Digitaldesign.scania.com/getting-started/](https://digitaldesign.scania.com/getting-started/development)

## Corporate UI Site
To run this project locally you will need **NodeJS** and **Npm** installed

Clone this repo, install all dependencies and start the application:
```bash
> git clone https://github.com/scania/corporate-ui-site.git
> cd corporate-ui-site
> npm i
> npm start
```

## Locally setup

Run locally with **Angular**
```bash
> cd corporate-ui-site
> npm i
> npm start
```

Visit http://localhost:1337/

## Fetch latest data from Corporate-Ui-CMS

To have access to latest data from our headless cms you need to fetch it with follow command:

```bash
> cd corporate-ui-site
> npm run data
```

## Developing with Corporate-Ui and Scania-Theme

Create npm links of **Corporate Ui** and **Scania theme**

Clone Corporate-UI and Scania-Theme
```bash
> cd ../corporate-ui
> npm link
> cd ../scania-theme
> npm link
```

Add links to **Corporate Ui** and **Scania theme** in Corporate-Ui-site
```bash
> npm run link
  // or
> cd corporate-ui-site
> npm link corporate-ui
> npm link scania-theme
```

## Technical notes
The application uses **Corporate Ui** together with **Scania theme** and the base structure is **Angular 8**.

It is rendered as follow:
- Content: **src/app/data/content.json** served by **app service**
- Templates: **src/app/data/templates.json** rendered by **page component**
- Router: **Angular router** initiated by **main component**.
