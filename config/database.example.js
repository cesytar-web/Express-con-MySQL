const mysql = require('mysql2')

const db = mysql.createConnection({
 host: 'localhost',
 user: 'tu usuario',
 password: 'tu contraseña',
 database: 'nombre de la base de datos',
})

db.connect(err => {
  if (err) {
    console.error("Error conectando a MySQL:", err);
    return;
  }
  console.log("Conectado a la base de datos MySQL");
});

module.exports = db