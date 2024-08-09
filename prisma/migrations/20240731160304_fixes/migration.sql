/*
  Warnings:

  - The values [PROCCESSING] on the enum `UploadStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "UploadStatus_new" AS ENUM ('PENDING', 'PROCESSING', 'FAILED', 'SUCCESS');
ALTER TABLE "FileData" ALTER COLUMN "uploadStatus" DROP DEFAULT;
ALTER TABLE "FileData" ALTER COLUMN "uploadStatus" TYPE "UploadStatus_new" USING ("uploadStatus"::text::"UploadStatus_new");
ALTER TYPE "UploadStatus" RENAME TO "UploadStatus_old";
ALTER TYPE "UploadStatus_new" RENAME TO "UploadStatus";
DROP TYPE "UploadStatus_old";
ALTER TABLE "FileData" ALTER COLUMN "uploadStatus" SET DEFAULT 'PENDING';
COMMIT;
