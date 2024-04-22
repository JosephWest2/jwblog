/*
  Warnings:

  - You are about to alter the column `article` on the `Article` table. The data in that column could be lost. The data in that column will be cast from `String` to `Binary`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Article" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "article" BLOB NOT NULL,
    "description" TEXT,
    "imageUrl" TEXT,
    "date" DATETIME NOT NULL
);
INSERT INTO "new_Article" ("article", "date", "description", "id", "imageUrl", "title") SELECT "article", "date", "description", "id", "imageUrl", "title" FROM "Article";
DROP TABLE "Article";
ALTER TABLE "new_Article" RENAME TO "Article";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
