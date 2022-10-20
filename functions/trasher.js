const axios = require("axios");
const cheerio = require("cheerio");

exports.handler = async () => {
  try {
    const res = axios.get("https://www.thrashermagazine.com/full-parts/");
    const { data } = res;
    const $ = cheerio.load(data);
    const postTitles = [];

    $("h4.post-title > a.post-title-link", data).each((_idx, el) => {
      const postTitle = $(el).text();
      postTitles.push(postTitle);
    });

    return {
      statusCode: 200,
      body: JSON.stringify(postTitles),
    };
  } catch (err) {
    return { statusCode: 404, body: JSON.stringify(err) };
  }
};
