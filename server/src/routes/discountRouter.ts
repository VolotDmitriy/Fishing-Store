import { Router, RequestHandler, Request, Response } from 'express';
import {
    getAllDiscouts, // Оставил как в твоём коде, но рекомендую исправить на getAllDiscounts
    getDiscountById,
    createDiscount,
    updateDiscount,
    deleteDiscount,
} from '../controllers/discountController';

// Тип из контроллера, с явным указанием типов из express
type RouterHandler = (req: Request, res: Response) => Promise<Response>;

// Обёртка для совместимости
const wrapHandler = (handler: RouterHandler): RequestHandler => {
    return async (req, res, next) => {
        try {
            await handler(req, res);
        } catch (error) {
            next(error);
        }
    };
};

const router = Router();

router.get('/', wrapHandler(getAllDiscouts));
router.get('/:id', wrapHandler(getDiscountById));
router.post('/', wrapHandler(createDiscount));
router.put('/:id', wrapHandler(updateDiscount));
router.delete('/:id', wrapHandler(deleteDiscount));

export default router;