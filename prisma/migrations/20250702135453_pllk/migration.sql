/*
  Warnings:

  - You are about to drop the `nima` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "nima" DROP CONSTRAINT "nima_user_id_fkey";

-- DropTable
DROP TABLE "nima";

-- CreateTable
CREATE TABLE "views" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "views_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "views" ADD CONSTRAINT "views_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
