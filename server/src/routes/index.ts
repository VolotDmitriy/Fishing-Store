import { Router, Response, Request } from 'express';
import tackleRoutes from './tackle';

const router = Router();
type RouterHandler = (req: Request, res: Response) => void;

const rootHandler: RouterHandler = (req, res) => {
    res.send('Hello from routes!');
};

router.get('/', rootHandler);
router.use('/tackle', tackleRoutes);
export default router;
