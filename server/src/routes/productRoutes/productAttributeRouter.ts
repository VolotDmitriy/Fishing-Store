import { Router } from 'express';
import {
    createAttribute,
    deleteAttributeById,
    getAllAttributes,
    getAttributeById,
    updateAttributeById,
} from '../../controllers/productAttributeController';

const router = Router();

router.get('/', getAllAttributes);
router.get('/:id', getAttributeById);
router.post('/', createAttribute);
router.put('/:id', updateAttributeById);
router.delete('/:id', deleteAttributeById);

export default router;
