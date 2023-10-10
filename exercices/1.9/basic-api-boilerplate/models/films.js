const path = require('node:path');

// eslint-disable-next-line import/extensions
const { serialize, parse } = require('../utils/json.js');

const jsonDbPath = path.join(__dirname, '/../data/films.json');

const defaultCINEMA = [
  {
    id: 1,
    title: 'Parasite',
    duration: 132,
    budget: 15500000,
    link: 'https://www.allocine.fr/film/fichefilm_gen_cfilm=255238.html',
  },

  {
    id: 2,
    title: 'Whiplash',
    duration: 107,
    budget: 3300000,
    link: 'https://www.imdb.com/title/tt2582802/',
  },

  {
    id: 3,
    title: 'Inception',
    duration: 148,
    budget: 160000000,
    link: 'https://www.allocine.fr/film/fichefilm_gen_cfilm=143692.html',
  },
];

// read the table CINEMA and potentially ordered 

function readAllFilm(orderBy) {
   const orderByTitle = orderBy?.includes('title') ? orderBy : undefined; 
   let orderedCinema;
   const films = parse(jsonDbPath, defaultCINEMA);
   if (orderByTitle)
      orderedCinema = [...films].sort((a, b) => a.title.localeCompare(b.title));
   if (orderByTitle === "-title")
      orderedCinema = orderedCinema.reverse();
   const allCinemaPotentiallyOrderd = orderedCinema ?? films;
   return allCinemaPotentiallyOrderd;
 };


function readOneFilm(id) {
   const idNumber = parseInt(id, 10);
   const films = parse(jsonDbPath, defaultCINEMA);
   const indexOfFilmFound = films.findIndex((film) => film.id === idNumber);
   if (indexOfFilmFound < 0) return undefined;
   return films[indexOfFilmFound];
 };


function getNextId() {
  const pizzas = parse(jsonDbPath, defaultCINEMA);
  const lastItemIndex = pizzas?.length !== 0 ? pizzas.length - 1 : undefined;
  if (lastItemIndex === undefined) return 1;
  const lastId = pizzas[lastItemIndex]?.id;
  const nextId = lastId + 1;
  return nextId;
}
function createOneFilm(title, durattion, budget, link) {
   const films = parse(jsonDbPath, defaultCINEMA);
   const createdFilm = {
      id: getNextId(),
      title,
      durattion,
      budget,
      link
   }
   films.push(createdFilm);
   serialize(jsonDbPath, films);
   return createdFilm
 };

function deleteOneFilm  (id) {
   const idNumber = parseInt(id, 10);
   const films = parse(jsonDbPath, defaultCINEMA);
   const foundIndex = films.findIndex((pizza) => pizza.id === idNumber);
   if (foundIndex < 0) return undefined;
   const deletedPizzas = films.splice(foundIndex, 1);
   const deletedPizza = deletedPizzas[0];
   serialize(jsonDbPath, films);

   return deletedPizza;
 };



function updateOneFilm(id, propertiesToUpdate) {
   const idNumber = parseInt(id, 10);
   const films = parse(jsonDbPath, defaultCINEMA);
   const foundIndex = films.findIndex((pizza) => pizza.id === idNumber);
   if (foundIndex < 0) return undefined;

   const updatedPizza = { ...films[foundIndex], ...propertiesToUpdate };

   films[foundIndex] = updatedPizza;

   serialize(jsonDbPath, films);

   return updatedPizza;
 };

module.exports = {
   readAllFilm,
   readOneFilm,
   createOneFilm,
   deleteOneFilm,
   updateOneFilm
};