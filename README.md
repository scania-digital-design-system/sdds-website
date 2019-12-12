# Corporate UI Site
*To run this project locally you will need **NodeJS** locally and for some actions **Ruby**.*

Clone this repo, install all dependencies and start the application:
```
git clone https://github.com/scania/corporate-ui-site.git
cd corporate-ui-site
npm i
npm start
```

## Locally setup
Create npm links of **Corporate Ui** and **Scania theme**
```
cd ../corporate-ui
npm link
cd ../scania-theme
npm link
```

Add links to **Corporate Ui** and **Scania theme**
```
cd corporate-ui-site
npm link corporate-ui
npm link scania-theme
```

Run locally with either **Angular** or **Jekyll** default is angular
```
npm run angular
```
You need to have **Ruby** installed then install **Jekyll**
```
gem install jekyll bundler
npm run jekyll
```

Visit http://localhost:1337/corporate-ui-site/

## Publish updates
Deploy the package
```
npm run deploy
```

## Technical notes
The application uses **Corporate Ui** together with **Scania theme** and the base structure is **Angular 8**.

It is rendered as follow:
- Content: **src/app/data/content.json** served by **app service**
- Templates: **src/app/data/templates.json** rendered by **page component**
- Router: **Angular router** initiated by **main component**.
