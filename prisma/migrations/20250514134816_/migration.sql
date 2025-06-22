/*
Warnings:

- You are about to drop the column `name` on the `user` table. All the data in the column will be lost.
- You are about to drop the column `password` on the `user` table. All the data in the column will be lost.
- Added the required column `mot_de_passe` to the `User` table without a default value. This is not possible if the table is not empty.
- Added the required column `prenom` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user`
DROP COLUMN `name`,
DROP COLUMN `password`,
ADD COLUMN `date_creation` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
ADD COLUMN `mot_de_passe` VARCHAR(191) NOT NULL,
ADD COLUMN `prenom` VARCHAR(191) NOT NULL,
ADD COLUMN `role` ENUM(
    'admin',
    'enseignant',
    'eleve',
    'parent'
) NOT NULL DEFAULT 'eleve';

-- CreateTable
CREATE TABLE `Eleve` (
    `id_eleve` INTEGER NOT NULL AUTO_INCREMENT,
    `date_naissance` DATETIME(3) NOT NULL,
    `sexe` ENUM('M', 'F') NOT NULL DEFAULT 'M',
    `adresse` VARCHAR(191) NOT NULL,
    `annee_academique_id` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,
    UNIQUE INDEX `Eleve_userId_key` (`userId`),
    PRIMARY KEY (`id_eleve`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Eleve`
ADD CONSTRAINT `Eleve_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;