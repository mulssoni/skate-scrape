const PORT = 8000;
const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const app = express();

axios.get("https://www.thrashermagazine.com/full-parts/").then((res) => {
  const { data } = res;
  const $ = cheerio.load(data);
  const postTitles = [];

  $("h4.post-title > a.post-title-link", data).each((_idx, el) => {
    const postTitle = $(el).text();
    postTitles.push(postTitle);
  });
  console.log(postTitles);
});

app.listen(PORT, () => console.log(`Listening port: ${PORT}`));
