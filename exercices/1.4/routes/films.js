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

// 1.3 read an id to find it

//1.3  Read all the films filtered by the uri

// Read all the films, filtered by minimum-duration if the query param exists
router.get('/', (req, res) => {
  const minimumFilmDuration = req?.query?.['minimum-duration']
    ? Number(req.query['minimum-duration'])
    : undefined;

  if (minimumFilmDuration === undefined) return res.json(films);

  if (typeof minimumFilmDuration !== 'number' || minimumFilmDuration <= 0)
    return res.json('Wrong minimum duration'); // bad practise (will be improved in exercise 1.5)

  const filmsReachingMinimumDuration = films.filter(
    (film) => film.duration >= minimumFilmDuration
  );
  return res.json(filmsReachingMinimumDuration);
});


router.get("/:id", (req, res, next) => {
  let foundIDFilm = req.params.id;
  foundIDFilm = parseInt(foundIDFilm);
  console.log("Le film que vous chercher : " + foundIDFilm);

  const indexOfFilmFound = CINEMA.findIndex((film) => film.id == foundIDFilm);

  if (indexOfFilmFound < 0) return res.sendStatus(404);

  res.json(CINEMA[indexOfFilmFound]);
  return next();
});

/// 1.3 Adding a  new movie
router.post("/", (req, res, next) => {
  const newTitle = req?.body?.title;
  const newDuration = req?.body?.duration;
  const newBudget = req?.body?.budget;
  const newLink = req?.body?.link;
  let lastId = CINEMA?.length !== 0 ? CINEMA.length - 1 : undefined;
  const nextId = lastId + 1;

  if (!newTitle || !newDuration || !newBudget || !newLink)
    return res.sendStatus(400);

  const newFilm = {
    id: nextId,
    title: newTitle,
    duration: newDuration,
    budget: newBudget,
    link: newLink,
  };

  CINEMA.push(newFilm);

  res.json(newFilm);
});

/* 1.4 Read all the pizzas from the cinema
   GET /films?order=title : ascending order by title
   GET /films?order=-title : descending order by title
*/

module.exports = router;
