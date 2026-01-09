import {
  DeleteObjectCommand,
  HeadObjectCommand,
  PutObjectCommand,
} from '@aws-sdk/client-s3';

import { S3 } from '../config/r2';
import { CustomError } from './error';

export async function uploadImageToR2(file: Express.Multer.File, type: string) {
  const bucketName = process.env.R2_BUCKET_NAME;

  if (!bucketName || !process.env.R2_PUBLIC_URL) {
    throw new Error('Missing R2 configuration');
  }

  // fileKey has to be unique.
  // To prevent conflict for files that have the same name
  // the timestamp will be appended before the original name

  const fileKey = `${type}/${Date.now()}_${file.originalname}`;

  // The public url will be appended to the fileKey to create the imageUrl
  // This allows the image to be displayed

  const imageUrl = encodeURI(`${process.env.R2_PUBLIC_URL}/${fileKey}`);
  console.log(imageUrl);

  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: fileKey,
    Body: file.buffer,
    ContentType: file.mimetype,
  });

  if (!S3) throw new Error('S3 client not configured');

  await S3.send(command);

  return imageUrl;
}

export async function deleteImageFromR2(key: string) {
  if (!S3) throw new Error('S3 client not configured');

  // Check if the file exists
  try {
    await S3.send(
      new HeadObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME,
        Key: key,
      }),
    );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.name === 'NotFound') {
      throw new CustomError({
        code: 'NOT_FOUND',
        status: 204,
        message: `Object with ${key} does not exist.`,
      });
    } else {
      throw error;
    }
  }

  const command = new DeleteObjectCommand({
    Bucket: process.env.R2_BUCKET_NAME,
    Key: key,
  });

  await S3.send(command);
}
