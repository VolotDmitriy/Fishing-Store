import { Router } from 'express';
import {
    createCategory,
    deleteCategoryById,
    getAllCategories,
    getCategoryById,
    updateCategoryById,
} from '../controllers/caregoryController';

const router = Router();

router.get('/', getAllCategories);
router.get('/:id', getCategoryById);
router.post('/', createCategory);
router.put('/:id', updateCategoryById);
router.delete('/:id', deleteCategoryById);

export default router;
