const Pool = require('pg').Pool
const pool = new Pool({
  user: "postgres",
  password: "salamance333",
  host: "localhost",
  port: 5432,
  database: "postgres"
})

 /**
  * GET all books
  */

const getBooks = (request, response) => {
    pool.query('SELECT * FROM libros', (error, results) => {
        if(error) {
            throw error
        }
    response.status(200).json(results.rows)
    })
}
/**
 * POST a new book
 */
const addBook = (request, response) => {
    const title         = request.body.title
    const author        = request.body.author
    const editorial     = request.body.editorial
    const genre         = request.body.genre
    const isbn          = request.body.isbn

    pool.query("INSERT INTO libros (titulo, autor, editorial, genero, isbn) VALUES ($1, $2, $3, $4, $5)",
    [title, author, editorial, genre, isbn],
    (error, results) => {
         if (error) {
             throw error
         }
         response.status(201).send('Libro añadido')
    })
}

module.exports = {
    getBooks,
    addBook
  }