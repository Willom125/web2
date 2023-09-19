var express = require("express");
var router = express.Router();

const MENU = [
  {
    id: 1,
    title: "Parasite",
    duration: 132,
    budget: 15500000,
    link: "https://www.allocine.fr/film/fichefilm_gen_cfilm=255238.html",
  },

  {
    id: 2,
    title: "Whiplash",
    duration: 107,
    budget: 3300000,
    link: "https://www.imdb.com/title/tt2582802/",
  },

  {
    id: 3,
    title: "Inception",
    duration: 148,
    budget: 160000000,
    link: "https://www.allocine.fr/film/fichefilm_gen_cfilm=143692.html",
  },
];

// Read all the films from the cinema
router.get("/", (req, res, next) => {
  console.log("GET /films");
  res.json(MENU);
});

module.exports = router;
