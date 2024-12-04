import * as crypto from 'crypto';

export function encryptData(data: string) {
  const algorithm = 'aes-256-ctr';
  const key = process.env.ENCRYPTION_KEY;
  const iv = crypto.randomBytes(16);

  const cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
  let encrypted = cipher.update(data, 'utf-8', 'hex');
  encrypted += cipher.final('hex');

  return { iv: iv.toString('hex'), encryptedData: encrypted };
}
