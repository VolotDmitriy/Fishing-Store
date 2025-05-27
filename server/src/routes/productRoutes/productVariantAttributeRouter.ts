import { Router } from 'express';
import {
    createProductVariantAttribute,
    deleteProductVariantAttributeById,
    getAllProductVariantAttributes,
    getProductVariantAttributeById,
    getProductVariantAttributeByVariantId,
    updateProductVariantAttributeById,
} from '../../controllers/productVariantAttributeController';

const router = Router();

router.get('/', getAllProductVariantAttributes);
router.get('/:id', getProductVariantAttributeById);
router.get('/:variantId', getProductVariantAttributeByVariantId);
router.post('/', createProductVariantAttribute);
router.put('/:id', updateProductVariantAttributeById);
router.delete('/:id', deleteProductVariantAttributeById);

export default router;
