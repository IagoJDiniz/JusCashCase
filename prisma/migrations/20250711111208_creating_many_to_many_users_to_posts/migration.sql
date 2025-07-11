/*
  Warnings:

  - You are about to drop the column `status` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `posts` table. All the data in the column will be lost.
  - Made the column `numero_processo` on table `posts` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "posts" DROP COLUMN "status",
DROP COLUMN "updated_at",
ALTER COLUMN "numero_processo" SET NOT NULL;

-- CreateTable
CREATE TABLE "user-post-status" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "status" "PostStatus" NOT NULL DEFAULT 'NEW',
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user-post-status_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user-post-status_userId_postId_key" ON "user-post-status"("userId", "postId");

-- AddForeignKey
ALTER TABLE "user-post-status" ADD CONSTRAINT "user-post-status_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user-post-status" ADD CONSTRAINT "user-post-status_postId_fkey" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
