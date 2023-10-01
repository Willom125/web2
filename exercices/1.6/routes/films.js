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
router.get("/:id", (req, res, next) => {
  let foundIDFilm = req.params.id;
  foundIDFilm = parseInt(foundIDFilm);
  console.log("Le film que vous chercher : " + foundIDFilm);

  const indexOfFilmFound = CINEMA.findIndex((film) => film.id == foundIDFilm);

//1.5
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
//1.5
  if (!newTitle || !newDuration || !newBudget || !newLink)
    return res.sendStatus(400);

  const existingFilm = CINEMA.find((film) => film.title.toLowerCase() === title.toLowerCase());

  if (existingFilm) return res.sendStatus(409);

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
//1.6
router.delete("/:id", (req, res, next) => {
    
  let IdASupp = req.params.id;
  
  console.log("Nous sommes sur le point de DELETE/" + IdASupp + "");

  const indexOfFilmFound = CINEMA.findIndex((film) => film.id == IdASupp);
  if (indexOfFilmFound < 0) return res.sendStatus(404)
   
  const itemsRemoved = CINEMA.splice(indexOfFilmFound, 1)
  const itemRemoved = itemsRemoved[0]
  
  return res.json(itemsRemoved);

  });

router.patch("/:id", (req, res, next) => {
    

  console.log(`PATCH/films/${req.params.id}`);
  
    const indexOfFilmFound = CINEMA.findIndex((film) => film.id === req.params.id)
  if (indexOfFilmFound < 0) return res.sendStatus(404)

  console.log(`POST/films`);

    const title = req?.body?.title;
    const duration = req?.body?.duration; 
    const budget = req?.body?.budget;
  const link = req?.body?.link;
  
  if ((!title && !duration && !budget && !link) || title.length < 1 || duration < 1 || budget < 1 || link.lengh < 1) return res.sendStatus(400);
  
  const updatedFilm = { ...CINEMA[indexOfFilmFound], ...req.body };
  CINEMA[indexOfFilmFound] = updatedFilm

  res.json(updatedFilm)

  });

  router.put("/:id", (req, res, next) => {
    
    console.log(`PUT/films/${req.params.id}`)

    console.log (`POST/films`)
    const title = req.body.title;
    const duration = req.body.duration;
    const budget = req.body.budget;
    const link = req.body.link;
if (
  (!title && !duration && !budget && !link) ||
  title.length < 1 ||
  duration < 1 ||
  budget < 1 ||
  link.lengh < 1
)
      return res.sendStatus(400);
    
    const foundIDFilm = CINEMA.findIndex((film) => film.id == req.params.id)
    if (foundIDFilm < 0) return res.sendStatus(400);

    const updatedFilms = { ...CINEMA[foundIDFilm], ...req.body }
    CINEMA [foundIDFilm] = updatedFilms

  });

module.exports = router;
