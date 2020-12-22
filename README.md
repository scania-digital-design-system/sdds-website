# Scania Digital Design System - Website

Visit SDDS at [digitaldesign.scania.com](https://digitaldesign.scania.com/)
## How to get started with @scania-sdds/components and @scania-sdds/theme-light

For more information how to contribute [Digitaldesign.scania.com/getting-started/](https://digitaldesign.scania.com/getting-started/development)

## SDDS Website
To run this project locally you will need **NodeJS** and **Npm** installed

Clone this repo, install all dependencies and start the application:
```bash
> git clone https://github.com/scania/sdds-website.git
> cd sdds-website
> npm i
> npm start
```

## Locally setup

Run locally with **Angular**
```bash
> cd sdds-website
> npm i
> npm start
```

Visit http://localhost:1337/

## Fetch latest data from SDDS-CMS

To have access to latest data from our headless cms you need to fetch it with follow command:

```bash
> cd sdds-website
> npm run data
```

## Running [@scania-sdds/components](https://www.npmjs.com/package/@scania-sdds/components) and [@scania-sdds/theme-light](https://www.npmjs.com/package/@scania-sdds/theme-light) on sdds-website

This is used to be able to run the local version on your compunter toghether with the website. To find out more about the SDDS component and themes packages please visit [scania-digital-design-system/sdds](https://github.com/scania-digital-design-system/sdds)


Clone SDDS components and theme from [scania-digital-design-system/sdds](https://github.com/scania-digital-design-system/sdds)

Create npm links of **SDDS components and theme**

```bash
> cd sdds/components
> npm link
> cd sdds/theme/light
> npm link
```

Use npm link to **@scania-sdds/components** and **@scania-sdds/theme-light** in sdds-website to run everything locally
```bash
> npm run link
  // or
> cd sdds-website
> npm link @scania/components
> npm link @scania/theme-light
```

## Technical notes

It is rendered as follow:
- Content: **src/app/data/content.json** served by **app service**
- Templates: **src/app/data/templates.json** rendered by **page component**
- Router: **Angular router** initiated by **main component**.
