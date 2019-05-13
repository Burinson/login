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
  * Generar objeto JSON de libros
  */
const getBooks = (request, response) => {
    pool.query('SELECT * FROM libros ORDER BY id ASC', (error, results) => {
        if(error) {
            throw error
        }
    response.status(200).json(results.rows)
    })
}
 /**
  * Generar objeto JSON de maestros
  */
 const getTeachers = (request, response) => {
  pool.query('SELECT * FROM maestro ORDER BY id ASC', (error, results) => {
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
    const copyNum       = request.body.copyNum

    pool.query("INSERT INTO libros (titulo, autor, editorial, genero, ISBN, num_ejemplar) VALUES ($1, $2, $3, $4, $5, $6)",
    [title, author, editorial, genre, isbn, copyNum],
    (error, results) => {
         if (error) {
             throw error
         }
         response.status(201).send('Libro añadido')
    })
}
/**
 * Insertar valores del formulario en la tabla "maestro"
 */
const addTeacher = (request, response) => {
  const departamento  = request.body.teacher_department
  const nombre        = request.body.teacher_name
  const apellido      = request.body.teacher_surname
  const correo        = request.body.teacher_email

  pool.query("INSERT INTO maestro (departamento, nombre, apellido, correo) VALUES ($1, $2, $3, $4)",
  [departamento, nombre, apellido, correo],
  (error, results) => {
       if (error) {
           throw error
       }
       response.status(201).send('Maestro añadido')
  })
}

/**
 * Consultas individuales para libros
 */
const getBookById = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('SELECT * FROM libros WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }
  /**
 * Consultas individuales para maestros
 */
const getTeacherById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM maestro WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}


/**
 * Exporta funciones
 */
module.exports = {
    getBooks,
    addBook,
    getBookById,
    getTeachers,
    addTeacher,
    getTeacherById
  }