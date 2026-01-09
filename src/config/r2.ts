import { S3Client } from '@aws-sdk/client-s3';

export const S3 = (() => {
  const accountId = process.env.R2_ACCOUNT_ID;
  const accessId = process.env.R2_ACCESS_ID;
  const accessKey = process.env.R2_SECRET_ACCESS_KEY;
  const url = process.env.R2_URL;

  if (!accountId || !accessId || !accessKey || !url) return null;

  return new S3Client({
    region: 'auto',
    endpoint: url,
    credentials: {
      accessKeyId: process.env.R2_ACCESS_ID as string,
      secretAccessKey: process.env.R2_SECRET_ACCESS_KEY as string,
    },
  });
})();
