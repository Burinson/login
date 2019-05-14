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
  * Generar objeto JSON de estudiantes
  */
 const getStudents = (request, response) => {
  pool.query('SELECT * FROM estudiante ORDER BY id ASC', (error, results) => {
      if(error) {
          throw error
      }
  response.status(200).json(results.rows)
  })
}
 /**
  * Generar objeto JSON de bibliotecarios
  */
 const getLibrarians = (request, response) => {
  pool.query('SELECT * FROM bibliotecario ORDER BY id ASC', (error, results) => {
      if(error) {
          throw error
      }
  response.status(200).json(results.rows)
  })
}
 /**
  * Generar objeto JSON de préstamos
  */
 const getLoans = (request, response) => {
  pool.query('SELECT * FROM prestamo ORDER BY id_prestamo ASC', (error, results) => {
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
 * Insertar valores del formulario en la tabla "estudiante"
 */
const addStudent = (request, response) => {
  const carrera       = request.body.student_major
  const nombre        = request.body.student_name
  const apellido      = request.body.student_surname
  const correo        = request.body.student_email

  pool.query("INSERT INTO estudiante (carrera, nombre, apellido, correo) VALUES ($1, $2, $3, $4)",
  [carrera, nombre, apellido, correo],
  (error, results) => {
       if (error) {
           throw error
       }
       response.status(201).send('Estudiante añadido')
  })
}
/**
 * Insertar valores del formulario en la tabla "bibliotecario"
 */
const addLibrarian = (request, response) => {
  const nombre        = request.body.librarian_name
  const apellido      = request.body.librarian_surname
  const contraseña    = request.body.librarian_password

  pool.query("INSERT INTO bibliotecario (nombre, apellido, contraseña) VALUES ($1, $2, $3)",
  [nombre, apellido, contraseña],
  (error, results) => {
       if (error) {
           throw error
       }
       response.status(201).send('Bibliotecario añadido')
  })
}
/**
 * Insertar valores del formulario en la tabla "préstamo"
 */
const addLoan = (request, response) => {
  var id_bibliotecario = request.body.loan_librarianId
  var id_maestro       = request.body.loan_teacherId
  var id_estudiante    = request.body.loan_studentId
  var id_libro         = request.body.loan_bookId
  var fecha_prestamo   = request.body.loan_loanDate
  var fecha_entrega    = request.body.loan_returnDate

  var hora_prestamo = 'NOW()'
  var hora_entrega = 'NOW()'

  if(fecha_entrega == "") {
    fecha_entrega = null;
    hora_entrega = null;
  }
  if (id_maestro == "")
    id_maestro = null;
  else if (id_estudiante == "")
      id_estudiante = null;
    
  pool.query("INSERT INTO prestamo (id_bibliotecario, id_maestro, id_estudiante, id_libro, fecha_prestamo, fecha_entrega, hora_prestamo, hora_entrega) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
    [id_bibliotecario, id_maestro, id_estudiante, id_libro, fecha_prestamo, fecha_entrega, hora_prestamo, hora_entrega],
    (error, results) => {
         if (error) {
             throw error
         }
         response.status(201).send('Préstamo añadido')
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
 * Consultas individuales para estudiantes
 */
const getStudentById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM estudiante WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}
  /**
 * Consultas individuales para bibliotecarios
 */
const getLibrarianById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM bibliotecario WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}
  /**
 * Consultas individuales para préstamos
 */
const getLoanById = (request, response) => {
  const id_prestamo = parseInt(request.params.id_prestamo)

  pool.query('SELECT * FROM prestamo WHERE id_prestamo = $1', [id_prestamo], (error, results) => {
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
    getTeacherById,

    getStudents,
    addStudent,
    getStudentById,

    getLibrarians,
    addLibrarian,
    getLibrarianById,

    getLoans,
    addLoan,
    getLoanById,
  }