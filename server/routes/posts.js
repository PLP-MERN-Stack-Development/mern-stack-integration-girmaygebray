const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const postsController = require('../controllers/posts');
const { handleValidation } = require('../middleware/validate');

router.get('/', postsController.getAll);
router.get('/:id', postsController.getOne);
router.post('/', [
  body('title').notEmpty().withMessage('Title required'),
  body('body').notEmpty().withMessage('Body required')
], handleValidation, postsController.create);
router.put('/:id', postsController.update);
router.delete('/:id', postsController.remove);

module.exports = router;
