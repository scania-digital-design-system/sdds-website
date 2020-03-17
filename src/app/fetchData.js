const { GraphQLClient } = require('graphql-request');
const fs = require('fs');
const HttpsProxyAgent = require('https-proxy-agent');

const url = 'https://sdds-cms.herokuapp.com/graphql';
// Needed when fetch data locally inside scania network
const proxy = 'http://proxyseso.scania.com:8080';

const writeFile = async(data, target) => {
  fs.writeFile(`./data/${target}.json`, JSON.stringify(data, null, 2), function(err) {
    if(err) {
      return console.log(err);
    }
    console.log(`File ${target} saved!`);
  }); 
}

const content = `
query {
  menus {
    id
    url
    title
    text: contents {
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
  }
}
`;

const navigation = `
query {
  navigation(id:1) {
    id
    title
    menus {
      ...allMenu
      submenus {
        ...allMenu
      }
    }
  }
}

fragment allMenu on Menu {
  id
  url
  title
}

`;

const templates = `
query {
  templates {
    id
    title
    text
  }
}
`;

const getData = async(targetName, target) => {
  console.log(`Reading data ${targetName}`);

  const graphQLClient = new GraphQLClient(url, {
    agent: new HttpsProxyAgent(proxy),
  })

  graphQLClient.request(target)
  .then(data => {
    writeFile(data,`${targetName}`)
  })
  .catch(err => console.log(err));
  
}

getData('content', content);
getData('navigation', navigation);
getData('templates', templates);