var express = require("express");
var router = express.Router();

const CINEMA = [
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


// read an id to find it

router.get("/:id", (req, res, next) => {
  let foundIDFilm = req.params.id;
  foundIDFilm = parseInt(foundIDFilm);
  console.log("Le film que vous chercher : " + foundIDFilm);

  const indexOfFilmFound = CINEMA.findIndex((film) => film.id == foundIDFilm);

  if (indexOfFilmFound < 0) return res.sendStatus(404);

  res.json(CINEMA[indexOfFilmFound]);
});

// Read all the films filtered by the uri

router.get("/", (req, res, next) => {
let filtered = [];
  let bearMin = req?.query?.minimum_duration;
  if (bearMin === undefined) {
    res.json(CINEMA);
  }
    bearMin = parseInt(bearMin);
    
  console.log("les films minimums :" + bearMin + "");
  
  CINEMA.forEach((film) => {
    if (film.duration >= bearMin) {
      filtered.push(film);
    }
  });
 res.json(filtered);
  
});

/// Adding a  new movie 
router.post("/", (req, res, next) => {
  
  const newTitle = req?.body?.title;
  const newDuration = req?.body?.duration;
  const newBudget = req?.body?.budget;
  const newLink = req?.body?.link;
  let lastId = CINEMA?.length !== 0 ? CINEMA.length - 1 : undefined;
  const nextId = lastId + 1; 
  
 if (!newTitle || !newDuration || !newBudget||!newLink) return res.sendStatus(400);

 const newFilm = { id: nextId, title: newTitle, duration: newDuration, budget: newBudget, link: newLink }
  
  CINEMA.push(newFilm);

  res.json(newFilm);
 });
module.exports = router;
