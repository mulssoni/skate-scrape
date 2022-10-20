const express = require("express");
const serverless = require("serverless-http");
const axios = require("axios");
// const cheerio = require("cheerio");

const app = express();
const router = express.Router();

// function scrapeTrasher() {
//   return axios
//     .get("https://www.thrashermagazine.com/full-parts/")
//     .then((res) => {
//       const { data } = res;
//       const $ = cheerio.load(data);
//       const postTitles = [];

//       $("h4.post-title > a.post-title-link", data).each((_idx, el) => {
//         const postTitle = $(el).text();
//         postTitles.push(postTitle);
//       });
//       return postTitles;
//     });
// }
router.get("/", (req, res) => {
  // const data = scrapeTrasher();
  const response = axios.get("https://jsonplaceholder.typicode.com/users");
  const data = response.data;
  res.json(data);
});

router.post("/testpost", (req, res) => {
  res.json({
    hello: "hit the POST!",
  });
});

app.use(`/.netlify/functions/api`, router);

module.exports = app;
module.exports.handler = serverless(app);
