-- DropForeignKey
ALTER TABLE "house_images" DROP CONSTRAINT "house_images_house_id_fkey";

-- AlterTable
ALTER TABLE "house_images" ALTER COLUMN "house_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "house_images" ADD CONSTRAINT "house_images_house_id_fkey" FOREIGN KEY ("house_id") REFERENCES "houses"("id") ON DELETE SET NULL ON UPDATE CASCADE;
