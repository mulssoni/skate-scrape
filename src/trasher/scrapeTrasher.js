"use strict";

const axios = require("axios");
const cheerio = require("cheerio");

exports.handler = () => {
  axios.get("https://www.thrashermagazine.com/full-parts/").then((res) => {
    const { data } = res;
    const $ = cheerio.load(data);
    const postTitles = [];

    $("h4.post-title > a.post-title-link", data).each((_idx, el) => {
      const postTitle = $(el).text();
      postTitles.push(postTitle);
    });
    return postTitles;
  });
};

module.exports = {
  scrapeTrasher,
};
