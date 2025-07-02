/*
  Warnings:

  - You are about to drop the `views` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "views" DROP CONSTRAINT "views_user_id_fkey";

-- DropTable
DROP TABLE "views";

-- CreateTable
CREATE TABLE "nima" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "nima_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "nima" ADD CONSTRAINT "nima_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
