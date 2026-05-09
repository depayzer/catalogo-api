const router = require('express').Router();
const auth = require('../middlewares/auth');
const {
  create, getAll, getOne, update, remove
} = require('../controllers/productController');

router.use(auth);

router.post('/', create);
router.get('/', getAll);
router.get('/:id', getOne);
router.put('/:id', update);
router.delete('/:id', remove);

module.exports = router;