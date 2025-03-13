import { Router } from 'express';
import {
    getAllAttributes,
    getAttributeById,
    createAttribute,
    updateAttributeById,
    deleteAttributeById,
} from '../../controllers/productAttributeController';

const router = Router();

router.get('/attribute', getAllAttributes);
router.get('/attribute/:id', getAttributeById);
router.post('/attribute', createAttribute);
router.put('/attribute/:id', updateAttributeById);
router.delete('/attribute/:id', deleteAttributeById);

export default router;
