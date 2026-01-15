import type { Request, Response } from 'express';

import type {
  ProductCreateInput,
  ProductFindUniqueArgs,
} from '../generated/prisma/models';
import {
  ProductCreateInputSchema,
  ProductFindUniqueArgsSchema,
  ProductUpdateInputSchema,
} from '../generated/zod';
import { CustomError } from '../lib/error';
import { prisma } from '../lib/prisma';
import {
  checkValidateRequestResult,
  validateRequestBody,
  validateRequestParams,
} from '../lib/request-validation';
import { zodValidate } from '../lib/utils';
import type { ApiResponse } from '../types/api';

export async function createProduct(
  req: Request<object, object, ProductCreateInput>,
  res: Response<ApiResponse>,
) {
  checkValidateRequestResult(
    validateRequestBody(
      req,
      ['name', 'sex', 'concentration'],
      ['image', 'rating', 'isActive'],
    ),
  );

  const newProductData = req.body;

  zodValidate(ProductCreateInputSchema, newProductData);

  const product = await prisma.product.create({ data: newProductData });

  res
    .status(201)
    .json({ success: true, message: 'Product created', data: product });
}

export async function getProducts(req: Request, res: Response<ApiResponse>) {
  const products = await prisma.product.findMany();
  res.status(200).json({
    success: true,
    message: 'Products retrieved successfully',
    data: products,
  });
}

export async function getProductById(
  req: Request<{ id: string }>,
  res: Response<ApiResponse>,
) {
  checkValidateRequestResult(validateRequestParams(req, ['id']));

  const args: ProductFindUniqueArgs = { where: { id: req.params.id } };

  zodValidate(ProductFindUniqueArgsSchema, args);

  const product = await prisma.product.findUnique(args);

  if (!product) {
    throw new CustomError({
      status: 404,
      message: 'Product not found',
      code: 'NOT_FOUND',
    });
  }

  res.status(200).json({
    success: true,
    message: 'Product retrieved successfully',
    data: product,
  });
}

export async function deleteProductById(
  req: Request<{ id: string }>,
  res: Response<ApiResponse>,
) {
  checkValidateRequestResult(validateRequestParams(req, ['id']));

  const args: ProductFindUniqueArgs = {
    where: { id: req.params.id },
  };

  zodValidate(ProductFindUniqueArgsSchema, args);

  const product = await prisma.product.findUnique(args);

  if (!product) {
    throw new CustomError({
      code: 'NOT_FOUND',
      status: 404,
      message: 'Product not found',
    });
  }

  await prisma.product.delete({
    where: { id: req.params.id },
  });

  res.status(204).send();
}

export async function updateProductById(
  req: Request<{ id: string }, object, Partial<ProductCreateInput>>,
  res: Response<ApiResponse>,
) {
  checkValidateRequestResult(validateRequestParams(req, ['id']));
  checkValidateRequestResult(
    validateRequestBody(
      req,
      [],
      ['name', 'image', 'rating', 'sex', 'concentration', 'isActive'],
    ),
  );

  const args: ProductFindUniqueArgs = {
    where: { id: req.params.id },
  };

  zodValidate(ProductFindUniqueArgsSchema, args);

  const product = prisma.product.findUnique(args);

  if (!product) {
    throw new CustomError({
      code: 'NOT_FOUND',
      status: 404,
      message: 'Product not found',
    });
  }

  const updateData: Partial<ProductCreateInput> = req.body;

  zodValidate(ProductUpdateInputSchema, updateData);

  const updatedProduct = await prisma.product.update({
    where: { id: req.params.id },
    data: updateData,
  });

  res.status(200).json({
    success: true,
    message: 'Product updated successfully',
    data: updatedProduct,
  });
}
