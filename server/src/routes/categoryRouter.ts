import { Router } from 'express';
import {
    createCategory,
    deleteCategoryById,
    getAllCategories,
    getCategoryById,
    updateCategoryById,
} from '../controllers/categoryController';
import { verifyToken } from '../middlewares/cookieJwtAuth';

const router = Router();

router.get('/', getAllCategories);
router.get('/:id', getCategoryById);
router.post('/', verifyToken, createCategory);
router.put('/:id', verifyToken, updateCategoryById);
router.delete('/:id', verifyToken, deleteCategoryById);

export default router;
