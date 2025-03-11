import { Request, Response, Router } from 'express';
import categoryRoutes from './categoryRouter';
import discountRouter from './discountRouter';
import productRouter from './productRouter';
import tackleRoutes from './tackle';

const router = Router();
type RouterHandler = (req: Request, res: Response) => void;

const rootHandler: RouterHandler = (req, res) => {
    res.send('Hello from routes!');
};

router.get('/', rootHandler);
router.use('/tackle', tackleRoutes);
router.use('/category', categoryRoutes);
router.use('/discount', discountRouter);
router.use('/product', productRouter);

export default router;
