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
    rootDiv.appendChild(renderHeader(key)(messages));
    rootDiv.appendChild(renderMainSection(messages));

    return rootDiv;
  };
}

function renderHeader(key) {
  return function(messages) {
    const rootDiv = document.createElement("header");

    const logo = document.createElement("img");
    logo.src = "logo.png";
    logo.alt = "Dashboard logo";
    rootDiv.appendChild(logo);

    const title = document.createElement("h1");
    const titleText = document.createTextNode(getDashboardTitle(messages));
    title.appendChild(titleText);
    rootDiv.appendChild(title);

    const subtitle = document.createElement("p");
    const linkToSpreadsheet = document.createElement("a");
    linkToSpreadsheet.href = getSpreadsheetUrl(key);
    linkToSpreadsheet.target = "_blank";
    const linkToSpreadsheetText = document.createTextNode("Editer les données");
    linkToSpreadsheet.appendChild(linkToSpreadsheetText);
    subtitle.appendChild(linkToSpreadsheet);
    rootDiv.appendChild(subtitle);

    return rootDiv;

    function getSpreadsheetUrl(key) {
      return "https://docs.google.com/spreadsheets/d/" + key + "/edit#gid=0";
    }

    function getDashboardTitle(messages) {
      const titleMessage = messages.find(keepMessagesOfType("title"));
      if (!titleMessage || !titleMessage.content) return "< Pas de titre >";

      return titleMessage.content;
    }
  };
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
