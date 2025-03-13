import { Router } from 'express';
import {
    getAllProducts,
    getProductById,
    getProductByCategory,
    createProduct,
    updateProductById,
    deleteProductById,
} from '../../controllers/productController';
import productAttributeRouter from './productAttributeRouter';
import productVariantAttributeRouter from './productVariantAttributeRouter';
import productVariantRouter from './productVariantRouter';
import variantTypeRouter from './variantTypeRouter';

const router = Router();

router.get('/product', getAllProducts);
router.get('/product/:id', getProductById);
router.get('/product/:categoryId', getProductByCategory);
router.post('/product', createProduct);
router.put('/product/:id', updateProductById);
router.delete('/product/:id', deleteProductById);

router.use('/', productAttributeRouter);
router.use('/', productVariantRouter);
router.use('/', variantTypeRouter);
router.use('/', productVariantAttributeRouter);

export default router;
