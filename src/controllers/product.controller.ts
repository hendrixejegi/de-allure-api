import type { Request, Response } from 'express';

import {
  ProductCreateInputSchema,
  ProductUpdateInputSchema,
  ProductWhereUniqueInputSchema,
} from '../generated/zod';
import { CustomError } from '../lib/error';
import { prisma } from '../lib/prisma';
import { sendSuccess, zodParse } from '../lib/utils';

export async function createProduct(req: Request, res: Response) {
  const allowed = zodParse(ProductCreateInputSchema, req.body);

  const product = await prisma.product.create({ data: allowed });
  sendSuccess(res, 201, { data: product });
}

export async function getProducts(req: Request, res: Response) {
  const products = await prisma.product.findMany();
  const meta = {
    total: products.length,
  };

  sendSuccess(res, 200, { data: products, meta });
}

export async function getProductById(req: Request, res: Response) {
  const allowed = zodParse(ProductWhereUniqueInputSchema, req.params);

  const product = await prisma.product.findUnique({ where: allowed });
  if (!product) {
    throw new CustomError(404, {
      code: 'not_found',
      message: 'Product not found',
    });
  }

  sendSuccess(res, 200, { data: product });
}

export async function deleteProductById(req: Request, res: Response) {
  const allowed = zodParse(ProductWhereUniqueInputSchema, req.params);

  const product = await prisma.product.findUnique({ where: allowed });
  if (!product) {
    throw new CustomError(404, {
      code: 'not_found',
      message: 'Product not found',
    });
  }

  await prisma.product.delete({
    where: allowed,
  });
  sendSuccess(res, 204);
}

export async function updateProductById(req: Request, res: Response) {
  const allowedParams = zodParse(ProductWhereUniqueInputSchema, req.params);
  const allowedBody = zodParse(ProductUpdateInputSchema, req.body);

  const product = prisma.product.findUnique({ where: allowedParams });
  if (!product) {
    throw new CustomError(404, {
      code: 'not_found',
      message: 'Product not found',
    });
  }

  const updatedProduct = await prisma.product.update({
    where: allowedParams,
    data: allowedBody,
  });

  sendSuccess(res, 200, { data: updatedProduct });
}
