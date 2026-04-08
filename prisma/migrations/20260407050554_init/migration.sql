-- CreateTable
CREATE TABLE "poi_type" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "poi_type_name_key" ON "poi_type"("name");
