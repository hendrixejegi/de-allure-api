import { randomUUID } from 'node:crypto';

import { PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import type { Request, Response } from 'express';

import { CustomError } from '../lib/error';
import {
  checkValidateRequestResult,
  validateRequestBody,
} from '../lib/request-validation';
import { bytesToMegabytes } from '../lib/utils';
import { S3 } from '../services/r2';
import type { ApiResponse } from '../types/api';

export async function uploadImageToR2(
  req: Request<object, object, { type: string; size: number }>,
  res: Response<ApiResponse>,
) {
  // Validate request body
  const result = checkValidateRequestResult(
    validateRequestBody(req, ['type', 'size']),
  );

  // checkValidateRequestResult will throw error if invalid. this line just points out the end of the process
  if (!result) return;

  // Validate file information
  const { size, type } = req.body;

  if (type !== 'image/jpeg' && type !== 'image/png') {
    throw new CustomError({
      code: 'BAD_REQUEST',
      status: 400,
      message: 'Invalid file type',
      data: { type, imageUrl: undefined, putUrl: undefined },
    });
  }

  if (bytesToMegabytes(size) > 5) {
    throw new CustomError({
      code: 'BAD_REQUEST',
      status: 400,
      message: 'Image is too large. Max upload size is 5 MB',
      data: { imageUrl: undefined, putUrl: undefined },
    });
  }

  if (!S3) {
    throw Error('S3 is not configured');
  }

  const safeName = randomUUID() + '.' + type.split('/')[1];

  const key = `${req.userId}/${safeName}`;
  const imageUrl = `${process.env.R2_PUBLIC_URL}/${key}`;

  const postUrl = await getSignedUrl(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    S3 as any,
    new PutObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME,
      Key: key,
      ContentType: type,
      ContentLength: size,
    }),
  );

  // Send back signed URL
  return res.status(200).json({
    success: true,
    message: 'URL generated successfully',
    data: { imageUrl, putUrl: postUrl },
  });
}
