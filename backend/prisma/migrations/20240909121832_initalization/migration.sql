-- CreateTable
CREATE TABLE "Collection" (
    "id" SERIAL NOT NULL,
    "Title" TEXT NOT NULL,
    "Description" TEXT NOT NULL,
    "Image_id" TEXT NOT NULL,

    CONSTRAINT "Collection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Episodes" (
    "Id" SERIAL NOT NULL,
    "Title" TEXT NOT NULL,
    "Description" TEXT NOT NULL,
    "CDN_id" TEXT NOT NULL,
    "collection_id" INTEGER NOT NULL,

    CONSTRAINT "Episodes_pkey" PRIMARY KEY ("Id")
);

-- AddForeignKey
ALTER TABLE "Episodes" ADD CONSTRAINT "Episodes_collection_id_fkey" FOREIGN KEY ("collection_id") REFERENCES "Collection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
