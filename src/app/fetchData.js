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

const templates = `
query {
  templates {
    id
    title
    sections {
      title
      id
      content
    }
  }
}
`;

const content = `
query {
  content:navigation(id:3) {
    id
    name
    pages {
      ...PageFields
      pages {
        ...PageFields
      }
    }
  }
}

fragment PageFields on Page {
  id
  url
  content {
    title
    description
    examples {
      id
      title
      text
    }
    template {
      title
      id
      sections {
        id
        content
      }
    }
  }
}

`;


const getData = async(targetName, target) => {
  request(url, target).then(result => {
    console.log(`Reading data ${targetName}`);
    writeFile(result, `${targetName}`);
  });
}

getData('templates', templates);
getData('content', content);

