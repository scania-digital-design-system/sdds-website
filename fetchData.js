const { GraphQLClient } = require('graphql-request');
const fs = require('fs');
const HttpsProxyAgent = require('https-proxy-agent');

const url = 'https://sdds-cms.herokuapp.com/graphql';
// const url = 'http://localhost:1339/graphql';

const init = () => {
  getData('content', content);
  getData('navigation', navigation);
  getData('templates', templates);
};

const content = `
query {
  menus {
    id
    url
    title
    contents {
      content {
        id
        title
        text
      }
      template {
        id
        title
        text
      }
    }
    submenus {
      title
      url
    }
    thumbnail {
      id
      url
    }
  }
}
`;

const navigation = `
query {
  navigations(sort: "id") {
    id
    title
    menus(sort: "index") {
      ...menu
      submenus(sort: "index") {
        ...menu
      }
    }
  }
}

fragment menu on Menu {
  id
  url
  title
  thumbnail {
    id
    url
  }
}
`;

const templates = `
query {
  templates(sort: "index") {
    id
    title
    text
  }
}
`;

const writeFile = async(data, target) => {
  fs.writeFile(`./src/app/data/${target}.json`, JSON.stringify(data, null, 2), (err) => {
    if(err) return console.log(err);

    console.log(`Saving file: "${target}.json"`);
  });
}

const getData = async(targetName, target, options) => {
  console.log(`Reading data: "${targetName}"${options ? ' (Using proxy)' : ''}`);

  const graphQLClient = new GraphQLClient(url, options);

  graphQLClient.request(target)
    .then(data => writeFile(data, targetName))
    .catch(err => {
      if(options) return console.log(err);

      getData(targetName, target, { agent: new HttpsProxyAgent(process.env.HTTP_PROXY) });
    });
}

init();