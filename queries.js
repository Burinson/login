/**
 * Conexión a la base de datos
 */
const Pool = require('pg').Pool
const pool = new Pool({
  user:         "postgres",
  password:     "salamance333",
  host:         "localhost",
  port:         5432,
  database:     "postgres"
})

 /**
  * Generar objeto JSON con todo lo que está en la tabla "libros"
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
 * Insertar valores del formulario en la tabla "libros"
 */
const addBook = (request, response) => {
    const title         = request.body.title
    const author        = request.body.author
    const editorial     = request.body.editorial
    const genre         = request.body.genre
    const isbn          = request.body.isbn

    pool.query("INSERT INTO libros (titulo, autor, editorial, genero, ISBN) VALUES ($1, $2, $3, $4, $5)",
    [title, author, editorial, genre, isbn],
    (error, results) => {
         if (error) {
             throw error
         }
         response.status(201).send('Libro añadido')
    })
}

/**
 * Exporta funciones
 */
module.exports = {
    getBooks,
    addBook
  }