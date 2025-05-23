
//Archivo index.js
const express = require("express")
const app = express()
app.use(express.json())
const router = express.Router()

const db = require('./config/database.js')

app.use('/products', require('./routes/products'))

app.use('/categories', require('./routes/categories'))

//Endpoint de base de datos
router.get('/createdb', (req, res) => {
 const sql = 'CREATE DATABASE market'

 db.query(sql, (err, result) => {
   if (err) throw err
   console.log(result)
   res.send('Database market created')
 })
})


app.listen(3000, () => {
  console.log("Servidor corriendo en http://localhost:3000");
});