import {Router} from 'express';
const router =  Router();
import NewsController from '../controllers/newsController';
import authMiddleware from '../middlewares/authMiddleware';
const newsController = new NewsController();


router.get('/', newsController.getAll);
router.get('/:id', newsController.getOne);
router.post('/', authMiddleware, newsController.create)
router.put('/:id', authMiddleware,newsController.edit);
router.delete('/:id', authMiddleware,newsController.delete)


module.exports = router;