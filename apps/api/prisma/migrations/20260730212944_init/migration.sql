/*
  Warnings:

  - The values [TWO_WD,FOUR_WD] on the enum `DriveType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "DriveType_new" AS ENUM ('2WD', '4WD', 'AWD');
ALTER TABLE "Car" ALTER COLUMN "driveType" TYPE "DriveType_new" USING ("driveType"::text::"DriveType_new");
ALTER TYPE "DriveType" RENAME TO "DriveType_old";
ALTER TYPE "DriveType_new" RENAME TO "DriveType";
DROP TYPE "DriveType_old";
COMMIT;
