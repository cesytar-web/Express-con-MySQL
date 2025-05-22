const express = require('express')
const router = express.Router()
const CategoriesController = require('../controllers/CategoriesControllers')


router.post('/', CatergoriesController.createCategories)

router.put('/', CategoriesController.updateCategories)

router.get('/', CategoriesController.getAll)

router.get('/products/categories', CategoriesController.getProCategories)

router.get('/id/:id', CategoriesController.getById)

router.get('/', CategoriesController.getDesc)

router.get('/title', CategoriesController.getSearch)

router.delete('/:id', CategoriesController.deleteId)




module.exports = router