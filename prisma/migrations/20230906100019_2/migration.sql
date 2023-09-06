/*
  Warnings:

  - Made the column `price` on table `book` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `book` MODIFY `price` DOUBLE NOT NULL DEFAULT 0.0;
