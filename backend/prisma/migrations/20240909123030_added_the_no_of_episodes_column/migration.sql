/*
  Warnings:

  - Added the required column `No_of_episodes` to the `Collection` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Collection" ADD COLUMN     "No_of_episodes" INTEGER NOT NULL;
