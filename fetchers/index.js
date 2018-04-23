const fetch = require('node-fetch');
const util = require('util');
const parseXML = util.promisify(require('xml2js').parseString);

module.exports = {
  translate: (lang, str) => {
    // To generate your own key, go here: https://cloud.google.com/translate/v2/getting_started
    const apiKey = 'AIzaSyBN-bwtos8sKU6X84wkrdjtCF7uzng6kgQ';
    const url =
      'https://www.googleapis.com' +
      '/language/translate/v2' +
      '?key=' +
      apiKey +
      '&source=en' +
      '&target=' +
      lang +
      '&q=' +
      encodeURIComponent(str);

    return fetch(url)
      .then(response => response.json())
      .then(
        parsedResponse => parsedResponse.data.translations[0].translatedText,
      );
  },

  fetchAuthor: id =>
    fetch(
      `https://www.goodreads.com/author/show.xml?id=${id}&key=MMRpMl6tqgHyFHwYp6Icg `,
    )
      .then(response => response.text())
      .then(parseXML),

  fetchBook: id =>
    fetch(
      `https://www.goodreads.com/book/show/${id}.xml?key=MMRpMl6tqgHyFHwYp6Icg`,
    )
      .then(response => response.text())
      .then(parseXML),
};
