/**
 * Base de datos
 */
const {Client} = require('pg')
const client = new Client({
    user: "postgres",
    password: "salamance333",
    host: "localhost",
    port: 5432,
    database: "postgres"
})

client.connect()
.then(() => console.log("Connected succesfully"))
.then(() => client.query("insert into libros values ($1, $2)", [17283], 'David']))
.then(() => client.query("select * from empleados"))
.then(results => console.table(results.rows))
.catch(e => console.log(e))
.finally(() => client.end())

