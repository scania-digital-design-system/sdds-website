# Corporate UI Site
*To run this project locally you will need NodeJS locally.*

Clone this repo, install all dependencies and start the application:
```
git clone https://github.com/scania/corporate-ui-site.git
cd corporate-ui-site
npm i
npm start
```

## Locally setup:
Create npm links of **Corporate Ui** and **Scania theme**:
```
cd ../corporate-ui-dev
npm link
cd ../scania-theme
npm link
```

Add links to **Corporate Ui** and **Scania theme**:
```
cd corporate-ui-site
npm link corporate-ui-dev
npm link scania-theme
```

## Technical notes
The application uses **Corporate Ui** together with **Scania theme** and the base structure is **Angular 8**.

It is rendered as follow:
- Content: **src/app/data/content.json** served by **app service**
- Templates: **src/app/data/templates.json** rendered by **page component**
- Router: **Angular router** initiated by **main component**.
