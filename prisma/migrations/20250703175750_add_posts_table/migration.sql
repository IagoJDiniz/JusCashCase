-- CreateTable
CREATE TABLE "posts" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "numero_processo" TEXT,
    "autores" TEXT[],
    "advogados" TEXT[],
    "valor_principal_bruto_liquido" TEXT,
    "valor_juros_moratorios" TEXT,
    "honorarios_advocaticios" TEXT,
    "data_publicacao" DATE NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "posts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "posts_data_publicacao_idx" ON "posts"("data_publicacao");
