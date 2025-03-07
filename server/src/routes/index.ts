import { Router, Response, Request } from 'express';
import tackleRoutes from './tackle';
import categoryRoutes from './categoryRouter';
import discountRouter from './discountRouter';

const router = Router();
type RouterHandler = (req: Request, res: Response) => void;

const rootHandler: RouterHandler = (req, res) => {
    res.send('Hello from routes!');
};

router.get('/', rootHandler);
router.use('/tackle', tackleRoutes);
router.use('/category', categoryRoutes);
router.use('/discount', discountRouter);

export default router;
