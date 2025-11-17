const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const categoriesController = require('../controllers/categories');
const { handleValidation } = require('../middleware/validate');

router.get('/', categoriesController.getAll);
router.post('/', [body('name').notEmpty().withMessage('Name required')], handleValidation, categoriesController.create);

module.exports = router;
