//https://docs.google.com/spreadsheets/d/1kfBUqXFsV3wVq9wxhvj7169YGT04BZE6IaGIKClWwXg/edit#gid=0

const defaultKey = "1kfBUqXFsV3wVq9wxhvj7169YGT04BZE6IaGIKClWwXg";
const key = window.location.hash.substr(1) || defaultKey;

window.onload = renderDashboardWithKey(key);

function renderDashboardWithKey(key) {
  return function() {
    Promise.resolve()
      .then(getJsonFromGoogleSheet(key))
      .then(getMessagesFromJson)
      .then(renderDashboard(key, document.body));
  };
}

function renderDashboard(key, rootDiv) {
  return function(messages) {
    setPageTitle(messages);

    rootDiv.appendChild(renderHeader(key)(messages));
    rootDiv.appendChild(renderMainSection(messages));

    return rootDiv;
  };
}

function setPageTitle(messages) {
  const title = getHeaderTitle(messages);
  document.title = title;
}

function renderHeader(key) {
  return function(messages) {
    const rootDiv = document.createElement("header");

    setHeaderBackgroundImage(rootDiv)(messages);

    rootDiv.appendChild(renderHeaderLogo(messages));
    rootDiv.appendChild(renderHeaderTitle(messages));
    rootDiv.appendChild(renderHeaderButton());

    return rootDiv;
  };
}

function setHeaderBackgroundImage(headerDiv) {
  return function(messages) {
    const headerBackgroundImage = getHeaderBackgroundImage(messages);
    headerDiv.style.backgroundImage = "url(" + headerBackgroundImage + ")";
  };
}

function renderHeaderTitle(messages) {
  const headerTitle = getHeaderTitle(messages);
  const title = document.createElement("h1");
  const titleText = document.createTextNode(headerTitle);
  title.appendChild(titleText);
  return title;
}

function renderHeaderLogo(messages) {
  const headerLogo = getHeaderLogo(messages);
  const logo = document.createElement("img");
  logo.src = headerLogo;
  logo.alt = "Dashboard logo";
  return logo;
}

function renderHeaderButton() {
  const subtitle = document.createElement("p");
  const linkToSpreadsheet = document.createElement("a");
  linkToSpreadsheet.href = getSpreadsheetUrl(key);
  linkToSpreadsheet.target = "_blank";
  const linkToSpreadsheetText = document.createTextNode("Editer les données");
  linkToSpreadsheet.appendChild(linkToSpreadsheetText);
  subtitle.appendChild(linkToSpreadsheet);
  return subtitle;
}

function getSpreadsheetUrl(key) {
  return "https://docs.google.com/spreadsheets/d/" + key + "/edit#gid=0";
}

function renderMainSection(messages) {
  const rootDiv = document.createElement("main");

  rootDiv.appendChild(renderAllMessagesOfType("news")(messages));
  rootDiv.appendChild(renderAllMessagesOfType("future")(messages));
  rootDiv.appendChild(renderAllMessagesOfType("ongoing")(messages));
  rootDiv.appendChild(renderAllMessagesOfType("recruitment")(messages));

  return rootDiv;
}

function renderAllMessagesOfType(messageType) {
  return function(messages) {
    const rootDiv = document.createElement("div");

    const title = document.createElement("h2");
    const titleText = document.createTextNode(
      findTitleForMessageType(messageType)(messages)
    );
    title.appendChild(titleText);
    rootDiv.appendChild(title);

    messages
      .filter(keepMessagesOfType(messageType))
      .forEach(renderMessage(rootDiv));

    return rootDiv;

    function findTitleForMessageType(messageType) {
      return function(messages) {
        const titleMessage = messages.find(
          keepMessagesOfType(messageType + ".title")
        );
        if (!titleMessage || !titleMessage.content) return messageType;

        return titleMessage.content;
      };
    }
  };
}

function renderMessage(rootDiv) {
  return function(message) {
    const messageParagraph = document.createElement("p");

    const contentDiv = document.createElement("div");
    const contentDivText = document.createTextNode("⭐ " + message.content);
    contentDiv.appendChild(contentDivText);
    messageParagraph.appendChild(contentDiv);

    if (message.url) {
      const urlDiv = document.createElement("div");
      const urlDivText = document.createTextNode("🔗 ");
      urlDiv.appendChild(urlDivText);
      const urlLink = document.createElement("a");
      urlLink.href = message.url;
      urlLink.target = "_blank";
      const urlLinkText = document.createTextNode(message.url);
      urlLink.appendChild(urlLinkText);
      urlDiv.appendChild(urlLink);
      messageParagraph.appendChild(urlDiv);
    }

    rootDiv.appendChild(messageParagraph);
  };
}

function getHeaderBackgroundImage(messages) {
  const logoMessage = messages.find(
    keepMessagesOfType("header.backgroundImage")
  );
  if (!logoMessage || !logoMessage.url) return "logo.png";

  return logoMessage.url;
}

function getHeaderLogo(messages) {
  const logoMessage = messages.find(keepMessagesOfType("header.logo"));
  if (!logoMessage || !logoMessage.url) return "logo.png";

  return logoMessage.url;
}

function getHeaderTitle(messages) {
  const titleMessage = messages.find(keepMessagesOfType("header.title"));
  if (!titleMessage || !titleMessage.content) return "< Pas de titre >";

  return titleMessage.content;
}

function keepMessagesOfType(messageType) {
  return function(message) {
    return message.type === messageType;
  };
}

function getMessagesFromJson(json) {
  const messages = json.feed.entry.map(function(entry) {
    const message = {
      updated: entry.updated["$t"]
    };

    Object.keys(entry).forEach(function(key) {
      if (/gsx\$/.test(key)) {
        const newKey = key.replace("gsx$", "");
        message[newKey] = entry[key]["$t"];
      }
    });

    return message;
  });

  return messages;
}

function getJsonFromGoogleSheet(key) {
  return function() {
    const url =
      "https://spreadsheets.google.com/feeds/list/" +
      key +
      "/od6/public/values?alt=json";

    return fetch(url).then(responseToJson);

    function responseToJson(res) {
      return res.json();
    }
  };
}
