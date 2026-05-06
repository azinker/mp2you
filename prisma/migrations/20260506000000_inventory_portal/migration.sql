CREATE TYPE "UserStatus" AS ENUM ('ACTIVE', 'DEACTIVATED');
CREATE TYPE "ThemePreference" AS ENUM ('SYSTEM', 'LIGHT', 'DARK');
CREATE TYPE "AssetOwnerType" AS ENUM ('USER', 'STUDIO', 'PRODUCT');
CREATE TYPE "ProductStatus" AS ENUM ('ACTIVE', 'LOW_STOCK', 'OUT_OF_STOCK', 'ARCHIVED', 'DISCONTINUED');
CREATE TYPE "InventoryTransactionType" AS ENUM ('INITIAL_COUNT', 'ADD', 'REMOVE', 'TRANSFER', 'CORRECTION');
CREATE TYPE "RemovalReason" AS ENUM ('SHIPPED', 'DAMAGED', 'SAMPLE', 'CORRECTION', 'TRANSFER', 'OTHER');
CREATE TYPE "ActivityAction" AS ENUM ('LOGIN', 'USER_INVITED', 'USER_ACCEPTED_INVITE', 'USER_UPDATED', 'USER_DEACTIVATED', 'PASSWORD_CHANGED', 'EMAIL_CHANGE_REQUESTED', 'AVATAR_CHANGED', 'STUDIO_CREATED', 'STUDIO_UPDATED', 'STUDIO_ARCHIVED', 'PRODUCT_CREATED', 'PRODUCT_UPDATED', 'PRODUCT_ARCHIVED', 'SUPPLIER_CREATED', 'SUPPLIER_UPDATED', 'SUPPLIER_ARCHIVED', 'LOCATION_CREATED', 'LOCATION_UPDATED', 'LOCATION_ARCHIVED', 'INVENTORY_INITIAL_COUNT', 'INVENTORY_ADDED', 'INVENTORY_REMOVED', 'INVENTORY_TRANSFERRED', 'INVENTORY_CORRECTED', 'REPORT_SENT', 'REPORT_FAILED');
CREATE TYPE "EntityType" AS ENUM ('USER', 'STUDIO', 'PRODUCT', 'SUPPLIER', 'LOCATION', 'INVENTORY', 'REPORT');
CREATE TYPE "ReportRunType" AS ENUM ('SCHEDULED', 'MANUAL', 'TEST');
CREATE TYPE "ReportRunStatus" AS ENUM ('SUCCESS', 'FAILED', 'PARTIAL');

CREATE TABLE "User" (
  "id" TEXT NOT NULL,
  "firstName" TEXT NOT NULL,
  "lastName" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "pendingEmail" TEXT,
  "avatarUrl" TEXT,
  "passwordHash" TEXT NOT NULL,
  "status" "UserStatus" NOT NULL DEFAULT 'ACTIVE',
  "reportOptIn" BOOLEAN NOT NULL DEFAULT true,
  "themePreference" "ThemePreference" NOT NULL DEFAULT 'SYSTEM',
  "isOriginalAdmin" BOOLEAN NOT NULL DEFAULT false,
  "lastLoginAt" TIMESTAMP(3),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Studio" (
  "id" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "repName" TEXT NOT NULL,
  "repEmail" TEXT NOT NULL,
  "repPhone" TEXT,
  "address" TEXT,
  "avatarUrl" TEXT,
  "notes" TEXT,
  "archivedAt" TIMESTAMP(3),
  "createdById" TEXT NOT NULL,
  "updatedById" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "Studio_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Supplier" (
  "id" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "contactName" TEXT,
  "email" TEXT,
  "phone" TEXT,
  "notes" TEXT,
  "archivedAt" TIMESTAMP(3),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "Supplier_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Location" (
  "id" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "description" TEXT,
  "archivedAt" TIMESTAMP(3),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Product" (
  "id" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "manualSku" TEXT,
  "internalSku" TEXT NOT NULL,
  "imageUrl" TEXT,
  "locationText" TEXT,
  "supplierText" TEXT,
  "unitCost" DECIMAL(12,2) NOT NULL DEFAULT 0,
  "unitSalePrice" DECIMAL(12,2) NOT NULL DEFAULT 0,
  "piecesPerCarton" INTEGER NOT NULL,
  "totalPiecesOnHand" INTEGER NOT NULL DEFAULT 0,
  "lowStockThreshold" INTEGER,
  "status" "ProductStatus" NOT NULL DEFAULT 'ACTIVE',
  "notes" TEXT,
  "archivedAt" TIMESTAMP(3),
  "discontinuedAt" TIMESTAMP(3),
  "studioId" TEXT,
  "supplierId" TEXT,
  "locationId" TEXT,
  "createdById" TEXT NOT NULL,
  "updatedById" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "InventoryBalance" (
  "id" TEXT NOT NULL,
  "productId" TEXT NOT NULL,
  "studioId" TEXT,
  "locationId" TEXT,
  "locationText" TEXT,
  "piecesOnHand" INTEGER NOT NULL DEFAULT 0,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "InventoryBalance_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "InventoryTransaction" (
  "id" TEXT NOT NULL,
  "productId" TEXT NOT NULL,
  "type" "InventoryTransactionType" NOT NULL,
  "quantityPieces" INTEGER NOT NULL,
  "previousTotal" INTEGER NOT NULL,
  "resultingTotal" INTEGER NOT NULL,
  "fromStudioId" TEXT,
  "toStudioId" TEXT,
  "fromLocationText" TEXT,
  "toLocationText" TEXT,
  "reason" "RemovalReason",
  "note" TEXT,
  "correctionComment" TEXT,
  "createdById" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "InventoryTransaction_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "ActivityLog" (
  "id" TEXT NOT NULL,
  "userId" TEXT,
  "action" "ActivityAction" NOT NULL,
  "entityType" "EntityType" NOT NULL,
  "entityId" TEXT,
  "entityName" TEXT NOT NULL,
  "summary" TEXT NOT NULL,
  "note" TEXT,
  "beforeValues" JSONB,
  "afterValues" JSONB,
  "studioId" TEXT,
  "productId" TEXT,
  "supplierId" TEXT,
  "locationId" TEXT,
  "relatedUserId" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "ActivityLog_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "WeeklyReportRun" (
  "id" TEXT NOT NULL,
  "runType" "ReportRunType" NOT NULL,
  "status" "ReportRunStatus" NOT NULL,
  "subject" TEXT NOT NULL,
  "periodStart" TIMESTAMP(3) NOT NULL,
  "periodEnd" TIMESTAMP(3) NOT NULL,
  "recipientEmails" TEXT[],
  "errorMessage" TEXT,
  "triggeredById" TEXT,
  "snapshot" JSONB,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "WeeklyReportRun_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "UploadedAsset" (
  "id" TEXT NOT NULL,
  "ownerType" "AssetOwnerType" NOT NULL,
  "ownerId" TEXT NOT NULL,
  "fileName" TEXT NOT NULL,
  "contentType" TEXT NOT NULL,
  "sizeBytes" INTEGER NOT NULL,
  "storageKey" TEXT NOT NULL,
  "publicUrl" TEXT NOT NULL,
  "createdById" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "UploadedAsset_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "PasswordResetToken" (
  "id" TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  "tokenHash" TEXT NOT NULL,
  "expiresAt" TIMESTAMP(3) NOT NULL,
  "usedAt" TIMESTAMP(3),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "PasswordResetToken_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "InviteToken" (
  "id" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "firstName" TEXT NOT NULL,
  "lastName" TEXT NOT NULL,
  "tokenHash" TEXT NOT NULL,
  "expiresAt" TIMESTAMP(3) NOT NULL,
  "acceptedAt" TIMESTAMP(3),
  "createdById" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "InviteToken_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "EmailVerificationToken" (
  "id" TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  "newEmail" TEXT NOT NULL,
  "tokenHash" TEXT NOT NULL,
  "expiresAt" TIMESTAMP(3) NOT NULL,
  "usedAt" TIMESTAMP(3),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "EmailVerificationToken_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX "Product_internalSku_key" ON "Product"("internalSku");
CREATE UNIQUE INDEX "InventoryBalance_productId_studioId_locationId_locationText_key" ON "InventoryBalance"("productId", "studioId", "locationId", "locationText");
CREATE UNIQUE INDEX "PasswordResetToken_tokenHash_key" ON "PasswordResetToken"("tokenHash");
CREATE UNIQUE INDEX "InviteToken_tokenHash_key" ON "InviteToken"("tokenHash");
CREATE UNIQUE INDEX "EmailVerificationToken_tokenHash_key" ON "EmailVerificationToken"("tokenHash");

CREATE INDEX "Studio_archivedAt_idx" ON "Studio"("archivedAt");
CREATE INDEX "Studio_name_idx" ON "Studio"("name");
CREATE INDEX "Product_name_idx" ON "Product"("name");
CREATE INDEX "Product_studioId_idx" ON "Product"("studioId");
CREATE INDEX "Product_supplierId_idx" ON "Product"("supplierId");
CREATE INDEX "Product_locationId_idx" ON "Product"("locationId");
CREATE INDEX "Product_status_idx" ON "Product"("status");
CREATE INDEX "InventoryBalance_studioId_idx" ON "InventoryBalance"("studioId");
CREATE INDEX "InventoryBalance_locationId_idx" ON "InventoryBalance"("locationId");
CREATE INDEX "InventoryTransaction_productId_createdAt_idx" ON "InventoryTransaction"("productId", "createdAt");
CREATE INDEX "InventoryTransaction_type_idx" ON "InventoryTransaction"("type");
CREATE INDEX "InventoryTransaction_createdAt_idx" ON "InventoryTransaction"("createdAt");
CREATE INDEX "ActivityLog_createdAt_idx" ON "ActivityLog"("createdAt");
CREATE INDEX "ActivityLog_action_idx" ON "ActivityLog"("action");
CREATE INDEX "ActivityLog_entityType_entityId_idx" ON "ActivityLog"("entityType", "entityId");
CREATE INDEX "ActivityLog_studioId_idx" ON "ActivityLog"("studioId");
CREATE INDEX "ActivityLog_productId_idx" ON "ActivityLog"("productId");
CREATE INDEX "UploadedAsset_ownerType_ownerId_idx" ON "UploadedAsset"("ownerType", "ownerId");

ALTER TABLE "Studio" ADD CONSTRAINT "Studio_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "Studio" ADD CONSTRAINT "Studio_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "Product" ADD CONSTRAINT "Product_studioId_fkey" FOREIGN KEY ("studioId") REFERENCES "Studio"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "Product" ADD CONSTRAINT "Product_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "Supplier"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "Product" ADD CONSTRAINT "Product_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "Product" ADD CONSTRAINT "Product_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "Product" ADD CONSTRAINT "Product_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "InventoryBalance" ADD CONSTRAINT "InventoryBalance_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "InventoryBalance" ADD CONSTRAINT "InventoryBalance_studioId_fkey" FOREIGN KEY ("studioId") REFERENCES "Studio"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "InventoryBalance" ADD CONSTRAINT "InventoryBalance_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "InventoryTransaction" ADD CONSTRAINT "InventoryTransaction_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "InventoryTransaction" ADD CONSTRAINT "InventoryTransaction_fromStudioId_fkey" FOREIGN KEY ("fromStudioId") REFERENCES "Studio"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "InventoryTransaction" ADD CONSTRAINT "InventoryTransaction_toStudioId_fkey" FOREIGN KEY ("toStudioId") REFERENCES "Studio"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "InventoryTransaction" ADD CONSTRAINT "InventoryTransaction_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "ActivityLog" ADD CONSTRAINT "ActivityLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "WeeklyReportRun" ADD CONSTRAINT "WeeklyReportRun_triggeredById_fkey" FOREIGN KEY ("triggeredById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "InviteToken" ADD CONSTRAINT "InviteToken_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
