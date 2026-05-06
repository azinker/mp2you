import "server-only";

import { GetObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { db } from "@/lib/inventory/db";

const acceptedTypes = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);
const maxBytes = 5 * 1024 * 1024;

function r2Client() {
  const accountId = process.env.CLOUDFLARE_R2_ACCOUNT_ID;
  const accessKeyId = process.env.CLOUDFLARE_R2_ACCESS_KEY_ID;
  const secretAccessKey = process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY;
  if (!accountId || !accessKeyId || !secretAccessKey) return null;

  return new S3Client({
    region: "auto",
    endpoint: process.env.CLOUDFLARE_R2_ENDPOINT || `https://${accountId}.r2.cloudflarestorage.com`,
    credentials: { accessKeyId, secretAccessKey },
  });
}

function inventoryAssetUrl(assetId: string) {
  return `/inventory/assets/${assetId}`;
}

export async function uploadInventoryImage(file: File | null, ownerType: "USER" | "STUDIO" | "PRODUCT", ownerId: string, userId?: string) {
  if (!file || file.size === 0) return null;
  if (!acceptedTypes.has(file.type)) {
    throw new Error("Images must be JPG, PNG, WebP, or GIF.");
  }
  if (file.size > maxBytes) {
    throw new Error("Images must be 5MB or smaller.");
  }

  const bucket = process.env.CLOUDFLARE_R2_BUCKET_NAME;
  const publicUrl = process.env.CLOUDFLARE_R2_PUBLIC_URL;
  const client = r2Client();
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "-").toLowerCase();
  const key = `inventory/${ownerType.toLowerCase()}/${ownerId}/${Date.now()}-${safeName}`;

  if (client && bucket) {
    const buffer = Buffer.from(await file.arrayBuffer());
    await client.send(
      new PutObjectCommand({
        Bucket: bucket,
        Key: key,
        Body: buffer,
        ContentType: file.type,
      }),
    );
    const externalUrl = publicUrl ? `${publicUrl.replace(/\/$/, "")}/${key}` : null;
    const asset = await db.uploadedAsset.create({
      data: {
        ownerType,
        ownerId,
        fileName: file.name,
        contentType: file.type,
        sizeBytes: file.size,
        storageKey: key,
        publicUrl: externalUrl || `r2://${bucket}/${key}`,
        createdById: userId,
      },
    });
    if (externalUrl) return externalUrl;

    const privateUrl = inventoryAssetUrl(asset.id);
    await db.uploadedAsset.update({ where: { id: asset.id }, data: { publicUrl: privateUrl } });
    return privateUrl;
  }

  return null;
}

export async function getInventoryImageObject(assetId: string) {
  const asset = await db.uploadedAsset.findUnique({ where: { id: assetId } });
  const client = r2Client();
  const bucket = process.env.CLOUDFLARE_R2_BUCKET_NAME;
  if (!asset || !client || !bucket) return null;

  const object = await client.send(new GetObjectCommand({ Bucket: bucket, Key: asset.storageKey }));
  return { asset, object };
}
