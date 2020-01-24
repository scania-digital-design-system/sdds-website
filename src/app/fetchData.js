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

const examples = `
query {
  examples {
    id
    title
    text
  }
}`;

const contents = `
query {
  contents {
    title,
    id,
    examples{id},
    template{id}
  }
}`;

const getData = async(targetName, target) => {
  request(url, target).then(result => {
    console.log(`Reading data ${targetName}`);
    writeFile(result, `${targetName}`);
  });
}

getData('examples', examples);
getData('contents', contents);

