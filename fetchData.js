const { GraphQLClient } = require('graphql-request');
const fs = require('fs');
const HttpsProxyAgent = require('https-proxy-agent');

const url = 'https://cms.digitaldesign.scania.com/graphql';
// const url = 'http://localhost:1340/graphql';

const init = () => {
  getData('content', content);
  getData('navigation', navigation);
};

const content = `
query {
  menus {
    ...menu
    showTabs
    pageStructure {
      __typename
      ... on ComponentPagePluginTab {
        id
        title : tabTitle
        active : enableTab
        pageContent: tabContent {
          content {
            ...detail
          }
        }
      }
      ... on ComponentPagePluginArticle {
        id
        pageContent {
          content {
            ...detail
          }
        }
      }
    }
    parent {
      ...menu
    }
    submenus {
      ...menu
    }
  }
}

fragment menu on Menu {
  id
  url
  displayLink
  title
  thumbnail {
    id
    url
  }
}

fragment detail on Content {
  id
  title
  section {
    __typename
    ... on ComponentContentPluginIconPreview {
      id
      Icon
      Description
    }
    ... on ComponentContentPluginIconList {
      id
      category
      iconList
      Icons {
        ...icons
      }
    }
    ... on ComponentContentPluginCodeExample {
      id
      title
      code
      componentTag
      preview
    }
    ... on ComponentContentPluginOneColumn {
      id
      Title
      Text
      LeadText {
        textfield
        Introduction
        id
      }
    }
    ...on ComponentContentPluginFullWidthImage {
      title
      caption
      Image { 
        ...image
      }
      id
    }
    ... on ComponentNestedTable {
      id
      tableTitle
      tableHtml
      size
    }
    ...on ComponentContentPluginTwoColumnsImages { 
      id
      Title
      Images { 
         ...image
      }
      texts: Text { 
        textfield
        Introduction
        id
      }
      linkCards {
        id
        title
        description
        info
        image {
          url
        }
        detail
        type
        url
        image {
          url
        }
      }      
      dosAndDonts{ 
        type
        image { 
          url
        }
        size
        description
        id
      }
    }
    ... on ComponentContentPluginTwoColumns {
      id
      Title
      ParagraphLeft {
        Introduction
        textfield
      }
      ParagraphRight {
        Introduction
        textfield
      }
    }
    ... on ComponentContentPluginColourList {
      id
      colour
    }
    ... on ComponentContentPluginOverviewList {
      id
      description
    }
    ... on ComponentContentPluginLeftImage {
      id
      title
      text
      image {
        name
        url
      }
    }
    ... on ComponentContentPluginRightImage {
      id
      title
      Paragraphs {
        textfield
        Columns
     }
      Images{
        ...image
      }
    }
  }
  updated_at
}

fragment icons on ComponentNestedIcon {
  id
  name
  title
  description
  usage
  restriction
}

fragment image on ComponentNestedImages {
  id
  label
  caption
  size: Size
  negative
  alternate
  image { 
  	url
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
  displayLink
  thumbnail {
    id
    url
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
      console.log(err);

      if(options) return;

      getData(targetName, target, { agent: new HttpsProxyAgent(process.env.HTTP_PROXY) });
    });
}

init();