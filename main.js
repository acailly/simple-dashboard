//https://docs.google.com/spreadsheets/d/1kfBUqXFsV3wVq9wxhvj7169YGT04BZE6IaGIKClWwXg/edit#gid=0

const key = "1kfBUqXFsV3wVq9wxhvj7169YGT04BZE6IaGIKClWwXg";
renderDashboardWithKey(key)

function renderDashboardWithKey(key) {
  Promise.resolve()
    .then(getJsonFromGoogleSheet(key))
    .then(getMessagesFromJson)
    .then(renderAllMessages)
    .then(appendToBody)
}

function appendToBody(element) {
  document.body.appendChild(element)
}

function renderAllMessages(messages) {
  const rootDiv = document.createElement('div')

  rootDiv.appendChild(renderAllMessagesOfType('News')(messages))
  rootDiv.appendChild(renderAllMessagesOfType('A venir')(messages))
  rootDiv.appendChild(renderAllMessagesOfType('En cours')(messages))
  rootDiv.appendChild(renderAllMessagesOfType('Entretien')(messages))

  return rootDiv
}

function renderAllMessagesOfType(messageType) {
  return function (messages) {

    const rootDiv = document.createElement('div')

    const title = document.createElement('h2')
    const titleText = document.createTextNode(messageType);
    title.appendChild(titleText);
    rootDiv.appendChild(title)

    messages
      .filter(keepMessagesOfType(messageType))
      .forEach(renderMessage(rootDiv))

    return rootDiv

    function keepMessagesOfType(messageType) {
      return function (message) {
        return message.type === messageType
      }
    }
  }
}

function renderMessage(rootDiv) {
  return function (message) {
    const newDiv = document.createElement("div");
    const newContent = document.createTextNode(message.type + ' - ' + message.content + ' (' + message.date + ')');
    newDiv.appendChild(newContent);
    rootDiv.appendChild(newDiv)
  }
}

function getMessagesFromJson(json) {
  const messages = json.feed.entry.map(function (entry) {
    const message = {
      "updated": entry.updated["$t"]
    }

    Object.keys(entry).forEach(function (key) {
      if (/gsx\$/.test(key)) {
        let newKey = key.replace("gsx$", "");
        message[newKey] = entry[key]["$t"];
      }
    })

    return message;
  })

  return messages
}

function getJsonFromGoogleSheet(key) {
  return function () {
    const url = "https://spreadsheets.google.com/feeds/list/" + key + "/od6/public/values?alt=json";

    return fetch(url)
      .then(responseToJson)

    function responseToJson(res) {
      return res.json()
    }
  }
}