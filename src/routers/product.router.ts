import { Router } from 'express';
import type { Router as ExpressRouter } from 'express';
import { checkAuth } from '../middlewares/check-auth';
import { createProduct } from '../controllers/product.controller';

const router: ExpressRouter = Router();

router.route('/').post([checkAuth, createProduct]);

export default router;
