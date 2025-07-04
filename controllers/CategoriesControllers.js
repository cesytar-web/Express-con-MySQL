const express = require('express')
const router = express.Router()
const db = require('../config/database.js')

//Crear tabla categorias
router.get('/createTableCategories', (req, res) => {
 const sql =
   'CREATE TABLE categories(id int AUTO_INCREMENT,title VARCHAR(255), body VARCHAR(255), PRIMARY KEY(id))'
 db.query(sql, (err, result) => {
   if (err) throw err
   console.log(result)
   res.send('Posts table created...')
 })
});

const CategoriesController = {
  createCategories (req, res){
  const { title, body } = req.body;
  const sql = 'INSERT INTO categories (title, body) VALUES (?, ?)';
  db.query(sql, [title, body], (err, result) => {
    if (err) {
      console.error('Error insertando categories:', err);
      return res.status(500).send('Error al añadir categories');
    }
    res.send('categories añadido correctamente');
  });
  }, 

postCategories (req, res) {
  const { title, body } = req.body;
  const sql = 'INSERT INTO categories (title, body) VALUES (?, ?)';
  db.query(sql, [title, body], (err, result) => {
    if (err) {
      console.error('Error insertando categoría:', err);
      return res.status(500).send('Error al añadir categoría');
    }
    res.send('Categoría añadida correctamente');
  });
},

putCategoriesId (req, res) {
  const { title, body } = req.body;
  const { id } = req.params;

  const sql = 'UPDATE categories SET title = ?, body = ? WHERE id = ?';
  db.query(sql, [title, body, id], (err, result) => {
    if (err) {
      console.error('Error actualizando categoría:', err);
      return res.status(500).send('Error al actualizar categoría');
    }
    if (result.affectedRows === 0) {
      return res.status(404).send('Categoría no encontrada');
    }
    res.send('Categoría actualizada correctamente');
  });
},

getCateg (req, res) {
  const sql = 'SELECT * FROM categories';
  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error obteniendo categorías:', err);
      return res.status(500).send('Error al obtener categorías');
    }
    res.json(result);
  });
},

getId(req, res) {
  const { id } = req.params;
  const sql = 'SELECT * FROM categories WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Error obteniendo categoría:', err);
      return res.status(500).send('Error al obtener categoría');
    }
    if (result.length === 0) {
      return res.status(404).send('Categoría no encontrada');
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


module.exports = CategoriesController