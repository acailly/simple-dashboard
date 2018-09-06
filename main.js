//https://docs.google.com/spreadsheets/d/1kfBUqXFsV3wVq9wxhvj7169YGT04BZE6IaGIKClWwXg/edit#gid=0

const key = "1kfBUqXFsV3wVq9wxhvj7169YGT04BZE6IaGIKClWwXg";

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
    rootDiv.appendChild(renderHeader(key));
    rootDiv.appendChild(renderMainSection(messages));

    return rootDiv;
  };
}

function renderHeader(key) {
  const rootDiv = document.createElement("header");

  const logo = document.createElement("img");
  logo.src = "logo.png";
  logo.alt = "Dashboard logo";
  rootDiv.appendChild(logo);

  const title = document.createElement("h1");
  const titleText = document.createTextNode("Mon Dashboard");
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
}

function renderMainSection(messages) {
  const rootDiv = document.createElement("main");

  rootDiv.appendChild(renderAllMessagesOfType("News")(messages));
  rootDiv.appendChild(renderAllMessagesOfType("A venir")(messages));
  rootDiv.appendChild(renderAllMessagesOfType("En cours")(messages));
  rootDiv.appendChild(renderAllMessagesOfType("Entretien")(messages));

  return rootDiv;
}

function renderAllMessagesOfType(messageType) {
  return function(messages) {
    const rootDiv = document.createElement("div");

    const title = document.createElement("h2");
    const titleText = document.createTextNode(messageType);
    title.appendChild(titleText);
    rootDiv.appendChild(title);

    messages
      .filter(keepMessagesOfType(messageType))
      .forEach(renderMessage(rootDiv));

    return rootDiv;

    function keepMessagesOfType(messageType) {
      return function(message) {
        return message.type === messageType;
      };
    }
  };
}

function renderMessage(rootDiv) {
  return function(message) {
    const newDiv = document.createElement("div");
    const newContent = document.createTextNode(
      message.type + " - " + message.content + " (" + message.date + ")"
    );
    newDiv.appendChild(newContent);
    rootDiv.appendChild(newDiv);
  };
}

function getMessagesFromJson(json) {
  const messages = json.feed.entry.map(function(entry) {
    const message = {
      updated: entry.updated["$t"]
    };

    Object.keys(entry).forEach(function(key) {
      if (/gsx\$/.test(key)) {
        let newKey = key.replace("gsx$", "");
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
