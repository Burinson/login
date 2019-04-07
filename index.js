
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
app.post('/libros', db.addBook)

/**
 * Mensaje de éxito al correr el servidor de Node.js
 */
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});









