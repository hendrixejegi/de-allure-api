import { toNodeHandler } from 'better-auth/node';
import cors, { type CorsOptions } from 'cors';
import express, {
  type NextFunction,
  type Request,
  type Response,
} from 'express';

import config from './config';
import { auth } from './lib/auth';
import { CustomError } from './lib/error';
import { deleteImageFromR2 } from './lib/file';
import { checkAuth } from './middlewares/check-auth';
import { errorHandler } from './middlewares/error-handler';
import bucketRouter from './routers/bucket.router';
import productsRouter from './routers/product.router';
import type { ApiResponse } from './types/api';

async function deleteImageFromCloudFlare(
  req: Request<object, object, { key: string }>,
  res: Response<ApiResponse>,
) {
  const { body } = req;

  if (typeof body !== 'object' || !('key' in body)) {
    throw new CustomError({
      code: 'BAD_REQUEST',
      status: 400,
      message: 'Missing key',
    });
  }

  const { key } = body;

  const finalKey = key
    .replace(process.env.R2_PUBLIC_URL + '/', '')
    .replace('%20', ' ');

  await deleteImageFromR2(finalKey);

  res
    .status(204)
    .json({ success: true, message: 'Image deleted successfully' });
}

const app = express();

const corsOptions: CorsOptions = {
  origin: ['http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  credentials: true,
};

app.use(cors(corsOptions));

app.all('/api/auth/{*splat}', toNodeHandler(auth)); // Better auth handler

app.use(express.json());

// Routers
app.use('/api/products', productsRouter);
app.use('/api/bucket', checkAuth, bucketRouter);
// app.delete('/image', deleteImageFromCloudFlare);

app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});
