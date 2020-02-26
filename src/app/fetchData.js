const { request } = require('graphql-request');
const fs = require('fs');

const url = 'http://localhost:1339/graphql';

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
  request(url, target).then(result => {
    console.log(`Reading data ${targetName}`);
    writeFile(result, `${targetName}`);
  });
}

getData('content', content);
getData('navigation', navigation);
getData('templates', templates);

