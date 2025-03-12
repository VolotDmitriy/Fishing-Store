import { Router } from 'express';
import {
    getAllVariantTypes,
    getVariantTypeById,
    createVariantType,
    updateVariantTypeById,
    deleteVariantTypeById,
    getAllProducts,
    getProductById,
    getProductByCategory,
    createProduct,
    updateProductById,
    deleteProductById,
    getAllAttributes,
    getAttributeById,
    createAttribute,
    updateAttributeById,
    deleteAttributeById,
} from '../controllers/productController';

const router = Router();

router.get('/variant_type', getAllVariantTypes);
router.get('/variant_type/:id', getVariantTypeById);
router.post('/variant_type', createVariantType);
router.put('/variant_type/:id', updateVariantTypeById);
router.delete('/variant_type/:id', deleteVariantTypeById);

router.get('/product', getAllProducts);
router.get('/product/:id', getProductById);
router.get('/product/:categoryId', getProductByCategory);
router.post('/product', createProduct);
router.put('/product/:id', updateProductById);
router.delete('/product/:id', deleteProductById);

router.get('/attribute', getAllAttributes);
router.get('/attribute/:id', getAttributeById);
router.post('/attribute', createAttribute);
router.put('/attribute/:id', updateAttributeById);
router.delete('/attribute/:id', deleteAttributeById);

export default router;
