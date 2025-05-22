const express = require('express')
const router = express.Router()
const db = require('../config/database.js')


// Crear tabla productos
router.get('/createTableProducts', (req, res) => {
 const sql =
   'CREATE TABLE products (id int AUTO_INCREMENT,title VARCHAR(255), body VARCHAR(255), PRIMARY KEY(id))'
 db.query(sql, (err, result) => {
   if (err) throw err
   console.log(result)
   res.send('Tabla produts created')
 })
});


const ProductsControllers = {
  createProducts (req, res)  {
  const { title, body } = req.body;
  const sql = 'INSERT INTO products (title, body) VALUES (?, ?)';
  db.query(sql, [title, body], (err, result) => {
    if (err) {
      console.error('Error insertando producto:', err);
      return res.status(500).send('Error al añadir producto');
    }
    res.send('Producto añadido correctamente');
  });
  },

updateProducts (req, res) {
  const { title, body } = req.body;
  const { id } = req.params;

  const sql = 'UPDATE products SET title = ?, body = ? WHERE id = ?';
  db.query(sql, [title, body, id], (err, result) => {
    if (err) {
      console.error('Error actualizando producto:', err);
      return res.status(500).send('Error al actualizar producto');
    }
    if (result.affectedRows === 0) {
      return res.status(404).send('Producto no encontrado');
    }
    res.send('Producto actualizado correctamente');
  });
},
getAll (req, res)  {
  const sql = 'SELECT * FROM products';
  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error obteniendo productos:', err);
      return res.status(500).send('Error al obtener productos');
    }
    res.json(result);
  });
},

getProCategories (req, res) {
  const sql = `
    SELECT products.id AS product_id, products.title AS product_title, products.body AS product_body,
           categories.id AS category_id, categories.title AS category_title, categories.body AS category_body
    FROM products
    JOIN product_categories ON products.id = product_categories.product_id
    JOIN categories ON product_categories.category_id = categories.id
  `;
  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error obteniendo productos con categorías:', err);
      return res.status(500).send('Error al obtener productos con categorías');
    }
    res.json(result);
  });
},

getById (req, res)  {
  const { id } = req.params;
  const sql = 'SELECT * FROM products WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Error obteniendo producto:', err);
      return res.status(500).send('Error al obtener producto');
    }
    if (result.length === 0) {
      return res.status(404).send('Producto no encontrado');
    }
    res.json(result[0]);
  });
},


getDesc (req, res) {
  const sql = 'SELECT * FROM products ORDER BY id DESC';
  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error obteniendo productos descendentes:', err);
      return res.status(500).send('Error al obtener productos descendentes');
    }
    res.json(result);
  });
},


getSearch (req, res) {
  const { title } = req.query; // Usamos `req.query` para obtener parámetros de la URL
  const sql = 'SELECT * FROM products WHERE title LIKE ?';
  db.query(sql, [`%${title}%`], (err, result) => {
    if (err) {
      console.error('Error buscando producto por nombre:', err);
      return res.status(500).send('Error al buscar producto');
    }
    if (result.length === 0) {
      return res.status(404).send('Producto no encontrado');
    }
    res.json(result);
  });
},


deleteId (req, res) { 
  const { id } = req.params;
  const sql = 'DELETE FROM products WHERE id = ?';
  
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Error al eliminar el producto:', err);
      return res.status(500).send('Error al eliminar producto');
    }

    if (result.affectedRows === 0) {
      return res.status(404).send('Producto no encontrado');
    }

    res.send('Producto eliminado correctamente');
  });
}

}

module.exports = ProductsControllers

