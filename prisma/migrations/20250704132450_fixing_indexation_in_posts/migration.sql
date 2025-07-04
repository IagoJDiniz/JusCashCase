-- AlterTable
ALTER TABLE "posts" ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE INDEX "posts_autores_idx" ON "posts"("autores");

-- CreateIndex
CREATE INDEX "posts_advogados_idx" ON "posts"("advogados");

-- CreateIndex
CREATE INDEX "posts_numero_processo_idx" ON "posts"("numero_processo");
