var express = require("express");
const { serialize, parse } = require("../utils/json.js");
var router = express.Router();

const jsonDbPath = __dirname + "/../data/films.json";

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

//1.3

// Read all the films, filtered by minimum-duration if the query param exists
router.get("/", (req, res) => {
  const minimumFilmDuration = req?.query?.["minimum-duration"]
    ? Number(req.query["minimum-duration"])
    : undefined;

  const films = parse(jsonDbPath, CINEMA);

  if (minimumFilmDuration === undefined) return res.json(films);

  if (typeof minimumFilmDuration !== "number" || minimumFilmDuration <= 0)
    return res.sendStatus(400);

  const filmsReachingMinimumDuration = films.filter(
    (film) => film.duration >= minimumFilmDuration
  );
  return res.json(filmsReachingMinimumDuration);
});

// 1.3 read an id to find it
router.get("/:id", (req, res, next) => {
  const films = parse(jsonDbPath, CINEMA);
  let foundIDFilm = req.params.id;
  foundIDFilm = parseInt(foundIDFilm);
  console.log("Le film que vous chercher : " + foundIDFilm);

  const indexOfFilmFound = films.findIndex((film) => film.id == foundIDFilm);

  //1.5
  if (indexOfFilmFound < 0) return res.sendStatus(404);

  res.json(films[indexOfFilmFound]);
  return next();
});

/// 1.3 Adding a  new movie
router.post("/", (req, res, next) => {
  const films = parse(jsonDbPath, CINEMA);
  const newTitle = req?.body?.title;
  const newDuration = req?.body?.duration;
  const newBudget = req?.body?.budget;
  const newLink = req?.body?.link;

  const lastItemIndex = films?.length !== 0 ? films.length - 1 : undefined;
  const lastId = lastItemIndex !== undefined ? films[lastItemIndex]?.id : 0;
  const nextId = lastId + 1;

  console.log(lastItemIndex);
  console.log(lastId);
  console.log(nextId);

  //1.5
  if (!newTitle || !newDuration || !newBudget || !newLink)
    return res.sendStatus(400);

  const existingFilm = films.find(
    (film) => film.title.toLowerCase() === newTitle.toLowerCase()
  );

  if (existingFilm) return res.sendStatus(409);

  const newFilm = {
    id: nextId,
    title: newTitle,
    duration: newDuration,
    budget: newBudget,
    link: newLink,
  };

  films.push(newFilm);
  serialize(jsonDbPath, films);

  res.json(newFilm);
});
//1.6
router.delete("/:id", (req, res, next) => {
  const films = parse(jsonDbPath, CINEMA);

  let IdASupp = parseInt(req.params.id);

  console.log("Nous sommes sur le point de DELETE/" + IdASupp + "");

  const indexOfFilmFound = films.findIndex((film) => film.id == IdASupp);
  if (indexOfFilmFound < 0) return res.sendStatus(404);

  const itemsRemoved = films.splice(indexOfFilmFound, 1);
  const itemRemoved = itemsRemoved[0];

  serialize(jsonDbPath, films);
  return res.json(itemRemoved);
});

router.patch("/:id", (req, res, next) => {
  console.log(`PATCH/films/${req.params.id}`);

  const films = parse(jsonDbPath, CINEMA);

  const indexOfFilmFound = films.findIndex(
    (film) => film.id === parseInt(req.params.id)
  );
  if (indexOfFilmFound < 0) return res.sendStatus(404);

  console.log(`POST/films`);

  const title = req?.body?.title;
  const duration = req?.body?.duration;
  const budget = req?.body?.budget;
  const link = req?.body?.link;

  if (
    (!title && !duration && !budget && !link) ||
    title?.length < 1 ||
    duration < 1 ||
    budget < 1 ||
    link?.length < 1
  )
    return res.sendStatus(400);

  const updatedFilm = { ...films[indexOfFilmFound], ...req.body };
  films[indexOfFilmFound] = updatedFilm;
  serialize(jsonDbPath, films);
  res.json(updatedFilm);
});

router.put("/:id", (req, res, next) => {
  console.log(`PUT/films/${req.params.id}`);

  console.log(`POST/films`);
  const title = req.body.title;
  const duration = req.body.duration;
  const budget = req.body.budget;
  const link = req.body.link;
  if (
    (!title && !duration && !budget && !link) ||
    title?.length < 1 ||
    duration < 1 ||
    budget < 1 ||
    link?.length < 1
  )
    return res.sendStatus(400);

  const foundIDFilm = CINEMA.findIndex(
    (film) => film.id == parseInt(req.params.id)
  );
  if (foundIDFilm < 0) return res.sendStatus(400);

  const updatedFilms = { ...CINEMA[foundIDFilm], ...req.body };
  CINEMA[foundIDFilm] = updatedFilms;
});

module.exports = router;
