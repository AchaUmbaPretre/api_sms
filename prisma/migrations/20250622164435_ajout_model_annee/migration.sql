/*
  Warnings:

  - You are about to drop the `annee_academique` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `classe` DROP FOREIGN KEY `Classe_annee_academiqueId_fkey`;

-- DropIndex
DROP INDEX `Classe_annee_academiqueId_fkey` ON `classe`;

-- DropTable
DROP TABLE `annee_academique`;

-- CreateTable
CREATE TABLE `AnneeAcademique` (
    `id_annee_academique` INTEGER NOT NULL AUTO_INCREMENT,
    `libelle` VARCHAR(191) NOT NULL,
    `date_debut` DATETIME(3) NOT NULL,
    `date_fin` DATETIME(3) NOT NULL,
    `actif` BOOLEAN NOT NULL,
    `date_creation` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id_annee_academique`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Classe` ADD CONSTRAINT `Classe_annee_academiqueId_fkey` FOREIGN KEY (`annee_academiqueId`) REFERENCES `AnneeAcademique`(`id_annee_academique`) ON DELETE RESTRICT ON UPDATE CASCADE;
