import { PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import type { Request, Response } from 'express';

import { CustomError } from '../lib/error';
import { validateRequestBody } from '../lib/request-validation';
import { bytesToMegabytes } from '../lib/utils';
import { S3 } from '../services/r2';
import type { ApiResponse } from '../types/api';

export async function uploadImageToR2(
  req: Request<object, object, { name: string; type: string; size: number }>,
  res: Response<ApiResponse>,
) {
  // Validate request body
  const { isValid, missing, unexpected } = validateRequestBody(req, [
    'name',
    'type',
    'size',
  ]);

  // Handle invalid request body
  if (!isValid) {
    if (missing.length > 0) {
      throw new CustomError({
        code: 'BAD_REQUEST',
        status: 400,
        message: 'Missing Fields',
        data: { missing, imageUrl: undefined, putUrl: undefined },
      });
    }

    if (unexpected.length > 0) {
      throw new CustomError({
        code: 'BAD_REQUEST',
        status: 400,
        message: 'Unexpected Fields',
        data: { unexpected, imageUrl: undefined, putUrl: undefined },
      });
    }
  }

  // Validate file information
  const { name, size, type } = req.body;

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

  const key = `${req.userId}/${name}`;
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
