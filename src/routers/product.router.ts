import type { Router as ExpressRouter } from 'express';
import { Router } from 'express';

import {
  createProduct,
  deleteProductById,
  getProductById,
  getProducts,
  updateProductById,
} from '../controllers/product.controller';
import { checkAuth } from '../middlewares/check-auth';

const router: ExpressRouter = Router();

router.route('/').post([checkAuth, createProduct]).get(getProducts);
router
  .route('/:id')
  .get(getProductById)
  .delete([checkAuth, deleteProductById])
  .patch([checkAuth, updateProductById]);

export default router;
