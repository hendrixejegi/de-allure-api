import { randomUUID } from 'node:crypto';

import { PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import type { Request, Response } from 'express';
import z from 'zod';

import { CustomError } from '../lib/error';
import { bytesToMegabytes, sendSuccess, zodParse } from '../lib/utils';
import { S3 } from '../services/r2';

const UploadRequestSchema = z.strictObject({
  type: z.string(),
  size: z.number(),
});

export async function uploadImageToR2(
  req: Request<object, object, { type: string; size: number }>,
  res: Response,
) {
  // Validate request body
  const { type, size } = zodParse(UploadRequestSchema, req.body);

  if (type !== 'image/jpeg' && type !== 'image/png') {
    throw new CustomError(400, {
      code: 'bad_request',
      message: 'Invalid file type',
      data: { type, imageUrl: undefined, putUrl: undefined },
    });
  }

  if (bytesToMegabytes(size) > 5) {
    throw new CustomError(400, {
      code: 'bad_request',
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

  const putUrl = await getSignedUrl(
    S3 as any,
    new PutObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME,
      Key: key,
      ContentType: type,
      ContentLength: size,
    }),
  );

  sendSuccess(res, 200, { data: { imageUrl, putUrl } });
}
