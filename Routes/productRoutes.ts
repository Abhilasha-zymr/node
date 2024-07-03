import { Router } from 'express';
import { authMiddleware } from '../middleware/userMiddleware';
import { handleCreateProduct, handleDeleteProduct, handleGetAllProduct, handleUpdateProduct,handleGetById } from '../Controllers/productController';

const router: Router = Router();

router.get('/api/products',authMiddleware,handleGetAllProduct);
router.get('/api/products/:id',authMiddleware,handleGetById)
router.post('/api/products',authMiddleware,handleCreateProduct);
router.put('/api/products/:id',authMiddleware,handleUpdateProduct);
router.delete('/api/products/:id',authMiddleware,handleDeleteProduct)



export default router;
