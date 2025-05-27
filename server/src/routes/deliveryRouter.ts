import { Router } from 'express';
import {
    getNovaPoshtaLocations,
    getWarehouses,
} from '../controllers/deliveryController';

const router = Router();

router.post('/location', getNovaPoshtaLocations);
router.post('/warehouse', getWarehouses);

export default router;
