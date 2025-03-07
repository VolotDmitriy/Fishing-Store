import { Router } from 'express';
import {
    createDiscount,
    deleteDiscount,
    getAllDiscounts, // Оставил как в твоём коде, но рекомендую исправить на getAllDiscounts
    getDiscountById,
    updateDiscount,
} from '../controllers/discountController';

const router = Router();

router.get('/', getAllDiscounts);
router.get('/:id', getDiscountById);
router.post('/', createDiscount);
router.put('/:id', updateDiscount);
router.delete('/:id', deleteDiscount);

export default router;
