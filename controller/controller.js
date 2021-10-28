const { Pool }= require("pg");
const URI = require("./../secret.js");

const controller = {};

const db = new Pool({
  connectionString: URI
});

// console.log('db', db)

//pool.query will query the db.
const query = (text, params) => {
  console.log('executed query: ', text);
  return db.query(text,param);
}


controller.getCharacters = async () => {
  let data = [];
  console.log('INSIDE controller');
  await db.query("SELECT * FROM people")
    .then(res => {
    data = res.rows;
    console.log('data INSIDE OF CALLBACK', data[0])
    })  
  .catch(err => console.log("CANNOT GET CHARACTERS : ", JSON.stringify(err)));

  console.log('data OUTSIDE OF CALLBACK', data[0])
  return data;

}

controller.getFilms = async () => {
  let data = [];
  await db.query("SELECT * FROM films")
    .then(res => {
    data = res.rows;
    console.log('data INSIDE OF CALLBACK', data[0])
    })  
  .catch(err => console.log("CANNOT GET FILMS : ", JSON.stringify(err)));

  return data;

}

controller.getFilmsByPeopleId = async (id) => {
  const sql = "SELECT films.* FROM public.people_in_films INNER JOIN public.films ON people_in_films.film_id = films._id WHERE people_in_films.person_id = $1";
  let data = [];
  await db.query(sql, [id])
    .then(res => {
    data = res.rows;
    console.log('data INSIDE OF CALLBACK', data[0])
    })  
  .catch(err => console.log("CANNOT GET FILMS : ", JSON.stringify(err)));

  return data;

}



module.exports = controller;