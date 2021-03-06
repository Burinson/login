
const express     = require('express');
const bodyParser  = require('body-parser');
const app         = express();
const port        = 3000;                 //Puerto para Node.js
const db          = require('./queries')  //Importa consultas

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
/**
 * Permite al navegador que utilice dominios externos
 */
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
  });

/**
 * Comprueba si está funcionando el servidor en el navegador
 */
app.get('/', (request, response) => {
    response.json({ info: 'Node.js'})
});

/**
 * Llama a funciones exportadas
 */
app.get('/libros', db.getBooks)
app.get('/libros/:id', db.getBookById)
app.post('/libros', db.addBook)

app.get('/maestros', db.getTeachers)
app.get('/maestros/:id', db.getTeacherById)
app.post('/maestros', db.addTeacher)

app.get('/estudiantes', db.getStudents)
app.get('/estudiantes/:id', db.getStudentById)
app.post('/estudiantes', db.addStudent)

app.get('/bibliotecarios', db.getLibrarians)
app.get('/bibliotecarios/:id', db.getLibrarianById)
app.post('/bibliotecarios', db.addLibrarian)

app.get('/prestamos', db.getLoans)
app.get('/prestamos/:id_prestamo', db.getLoanById)
app.post('/prestamos', db.addLoan)

app.post('/devoluciones', db.addReturn)

app.get('/ticket/:id_prestamo', db.getTicket)


/**
 * Mensaje de éxito al correr el servidor de Node.js
 */
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});









