const express = require("express");

const { readAllFilm,readOneFilm,createOneFilm,deleteOneFilm,updateOneFilm} = require('../models/films');

const router = express.Router();



// 1.3
// Read all the films, filtered by minimum-duration if the query param exists
router.get("/", (req, res) => {
 const allFilmsPotentiallyOrdered=readAllFilm(req?.query?.order)
  return res.json(allFilmsPotentiallyOrdered);
});

// 1.3 read an id to find it
router.get("/:id", (req, res) => {
  const oneFilm = readOneFilm(req.params.id)
  if(!oneFilm) return res.sendStatus(404)
  return res.json(oneFilm);
  
});

/// 1.3 Adding a  new movie
// eslint-disable-next-line consistent-return
router.post("/", (req, res) => {
                   const title = req?.body?.title?.length !== 0 ? req.body.title : undefined;
  const link = req?.body?.link?.length !== 0 ? req.body.link : undefined;
  const duration = req?.body?.duration > 0 ? req.body.duration : undefined;
  const budget = req?.body?.budget > 0  ? req.body.budget : undefined

                   if (!title || !link || !duration||!budget) return res.sendStatus(400); // error code '400 Bad request'

                   const addingMovie = createOneFilm(title,duration,budget,link);
                   res.json(addingMovie);
              });
// 1.6
router.delete("/:id", (req, res) => {

  const removedFilm = deleteOneFilm(req?.params?.id);

  if (!removedFilm) return res.sendStatus(404);

  return res.json(removedFilm);

});

// eslint-disable-next-line consistent-return
router.patch("/:id", (req, res) => {

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

  const updatedFilm = updateOneFilm(req.params.id, { title, duration, budget, link });
  
  if (!updateOneFilm) return res.sendStatus(404);
 return res.json(updatedFilm);
});


router.put("/:id", (req, res) => {

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

const updatedFilm = updateOneFilm(req.params.id, { title, duration, budget, link });

if (!updateOneFilm) return res.sendStatus(404);
res.json(updatedFilm);});

module.exports = router;
