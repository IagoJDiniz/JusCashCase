-- Add Extension
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- CeateIndex
CREATE INDEX posts_text_trgm_idx ON posts USING GIN (text gin_trgm_ops);

-- CreateEnum
CREATE TYPE "PostStatus" AS ENUM ('NEW', 'READED', 'SENT', 'DONE');

-- AlterTable
ALTER TABLE "posts" ADD COLUMN     "status" "PostStatus" NOT NULL DEFAULT 'NEW';
