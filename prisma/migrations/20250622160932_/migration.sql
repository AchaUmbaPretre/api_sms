-- AlterTable
ALTER TABLE `eleve` ADD COLUMN `date_creation` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- CreateTable
CREATE TABLE `Annee_academique` (
    `id_annee_academique` INTEGER NOT NULL AUTO_INCREMENT,
    `libelle` VARCHAR(191) NOT NULL,
    `date_debut` DATETIME(3) NOT NULL,
    `date_fin` DATETIME(3) NOT NULL,
    `actif` BOOLEAN NOT NULL,
    `date_creation` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id_annee_academique`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Classe` (
    `id_classe` INTEGER NOT NULL AUTO_INCREMENT,
    `nom_classe` VARCHAR(191) NOT NULL,
    `niveau` VARCHAR(191) NOT NULL,
    `annee_academiqueId` INTEGER NOT NULL,

    PRIMARY KEY (`id_classe`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Classe` ADD CONSTRAINT `Classe_annee_academiqueId_fkey` FOREIGN KEY (`annee_academiqueId`) REFERENCES `Annee_academique`(`id_annee_academique`) ON DELETE RESTRICT ON UPDATE CASCADE;
