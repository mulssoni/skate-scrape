const axios = require("axios");
const cheerio = require("cheerio");

exports.handler = async () => {
  try {
    const res = await axios.get("https://www.thrashermagazine.com/full-parts/");
    const { data } = res;
    const $ = cheerio.load(data);
    const postTitles = [];

    $("h4.post-title > a.post-title-link", data).each((_idx, el) => {
      const postTitle = $(el).text();
      const url = $(el).attr("href");
      postTitles.push({
        title: postTitle,
        link: "https://www.thrashermagazine.com" + url,
      });
    });
    console.log(postTitles);
    return {
      statusCode: 200,
      body: JSON.stringify(postTitles),
    };
  } catch (err) {
    return { statusCode: 404, body: JSON.stringify(err) };
  }
};
