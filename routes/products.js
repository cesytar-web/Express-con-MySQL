const express = require('express')
const router = express.Router()
const ProductsController = require('../controllers/ProductsControllers')

router.post('/', ProductsController.createProducts)

router.put('/', ProductsController.updateProducts)

router.get('/', ProductsController.getAll)

router.get('/products/categories', ProductsController.getProCategories)

router.get('/id/:id', ProductsController.getById)

router.get('/', ProductsController.getDesc)

router.get('/title', ProductsController.getSearch)

router.delete('/:id', ProductsController.deleteId)




module.exports = router

