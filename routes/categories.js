const express = require('express')
const router = express.Router()
const CategoriesController = require('../controllers/CategoriesControllers')


router.post('/', CategoriesController.createCategories)

router.put('/', CategoriesController.putCategoriesId)

router.get('/', CategoriesController.getCateg)

router.get('/products/categories', CategoriesController.getId)

router.get('/', CategoriesController.getDesc)

router.get('/title', CategoriesController.getSearch)

router.delete('/:id', CategoriesController.deleteId)




module.exports = router