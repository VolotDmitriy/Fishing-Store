import { Request, Response, Router } from 'express';
import { verifyToken } from '../middlewares/cookieJwtAuth';
import adminAuth from './adminAuth';
import categoryRoutes from './categoryRouter';
import discountRouter from './discountRouter';
import productRouter from './productRoutes/productRouter';

const router = Router();
type RouterHandler = (req: Request, res: Response) => void;

const rootHandler: RouterHandler = (req, res) => {
    res.send('Hello from routes!');
};

router.get('/', rootHandler);
router.use('/category', categoryRoutes);
router.use('/discount', discountRouter);
router.use('/product', productRouter);
router.use('/admin', adminAuth);

router.get('/check-token', verifyToken, (req, res) => {
    res.status(200).json({ message: 'Token is valid' });
});

export default router;
