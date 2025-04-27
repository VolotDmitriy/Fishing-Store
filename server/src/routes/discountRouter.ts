import { Router } from 'express';
import {
    createDiscount,
    deleteDiscount,
    getAllDiscounts,
    getDiscountById,
    updateDiscount,
} from '../controllers/discountController';
import { verifyToken } from '../middlewares/cookieJwtAuth';

const router = Router();

router.get('/', getAllDiscounts);
router.get('/:id', getDiscountById);
router.post('/', verifyToken, createDiscount);
router.put('/:id', verifyToken, updateDiscount);
router.delete('/:id', verifyToken, deleteDiscount);

export default router;
