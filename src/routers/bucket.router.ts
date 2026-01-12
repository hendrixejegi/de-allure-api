import type { Router as ExpressRouter } from 'express';
import { Router } from 'express';

import { uploadImageToR2 } from '../controllers/bucket.controller';

const router: ExpressRouter = Router();

router.route('/image').post(uploadImageToR2);

export default router;
