-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `prenom` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `mot_de_passe` VARCHAR(191) NOT NULL,
    `role` ENUM('admin', 'enseignant', 'eleve', 'parent') NOT NULL DEFAULT 'eleve',
    `date_creation` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Eleve` (
    `id_eleve` INTEGER NOT NULL AUTO_INCREMENT,
    `nom` VARCHAR(191) NOT NULL,
    `postnom` VARCHAR(191) NOT NULL,
    `date_naissance` DATETIME(3) NOT NULL,
    `sexe` ENUM('M', 'F') NOT NULL DEFAULT 'M',
    `adresse` VARCHAR(191) NOT NULL,
    `annee_academique_id` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,
    `date_creation` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Eleve_userId_key`(`userId`),
    PRIMARY KEY (`id_eleve`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Parents` (
    `id_parent` INTEGER NOT NULL AUTO_INCREMENT,
    `nom` VARCHAR(191) NOT NULL,
    `postnom` VARCHAR(191) NOT NULL,
    `sexe` ENUM('M', 'F') NOT NULL DEFAULT 'M',
    `userId` INTEGER NOT NULL,

    UNIQUE INDEX `Parents_userId_key`(`userId`),
    PRIMARY KEY (`id_parent`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Eleves_parents` (
    `id_eleve_parent` INTEGER NOT NULL AUTO_INCREMENT,
    `id_eleve` INTEGER NOT NULL,
    `id_parent` INTEGER NOT NULL,

    UNIQUE INDEX `Eleves_parents_id_eleve_key`(`id_eleve`),
    PRIMARY KEY (`id_eleve_parent`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `specialite` (
    `id_specialite` INTEGER NOT NULL AUTO_INCREMENT,
    `nom_specialite` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_specialite`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Professeurs` (
    `id_professeur` INTEGER NOT NULL AUTO_INCREMENT,
    `nom` VARCHAR(191) NOT NULL,
    `postnom` VARCHAR(191) NOT NULL,
    `sexe` ENUM('M', 'F') NOT NULL DEFAULT 'M',
    `userId` INTEGER NOT NULL,
    `id_specialite` INTEGER NOT NULL,

    UNIQUE INDEX `Professeurs_userId_key`(`userId`),
    UNIQUE INDEX `Professeurs_id_specialite_key`(`id_specialite`),
    PRIMARY KEY (`id_professeur`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Professeurs_matieres` (
    `id_professeurs_matieres` INTEGER NOT NULL AUTO_INCREMENT,
    `id_professeur` INTEGER NOT NULL,
    `id_matiere` INTEGER NOT NULL,
    `id_classe` INTEGER NOT NULL,
    `date_creation` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id_professeurs_matieres`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

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

-- CreateTable
CREATE TABLE `Filieres` (
    `id_filiere` INTEGER NOT NULL AUTO_INCREMENT,
    `nom_filiere` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_filiere`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Classe` (
    `id_classe` INTEGER NOT NULL AUTO_INCREMENT,
    `nom_classe` VARCHAR(191) NOT NULL,
    `niveau` ENUM('primaire', 'secondaire') NOT NULL DEFAULT 'primaire',
    `annee_academiqueId` INTEGER NOT NULL,
    `id_filiere` INTEGER NOT NULL,
    `date_creation` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id_classe`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Matieres` (
    `id_matiere` INTEGER NOT NULL AUTO_INCREMENT,
    `nom_matiere` VARCHAR(191) NOT NULL,
    `coefficient` INTEGER NOT NULL DEFAULT 1,

    PRIMARY KEY (`id_matiere`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Periodes` (
    `id_periode` INTEGER NOT NULL AUTO_INCREMENT,
    `nom_periode` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_periode`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Eleve` ADD CONSTRAINT `Eleve_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Parents` ADD CONSTRAINT `Parents_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Eleves_parents` ADD CONSTRAINT `Eleves_parents_id_eleve_fkey` FOREIGN KEY (`id_eleve`) REFERENCES `Eleve`(`id_eleve`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Eleves_parents` ADD CONSTRAINT `Eleves_parents_id_parent_fkey` FOREIGN KEY (`id_parent`) REFERENCES `Parents`(`id_parent`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Professeurs` ADD CONSTRAINT `Professeurs_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Professeurs` ADD CONSTRAINT `Professeurs_id_specialite_fkey` FOREIGN KEY (`id_specialite`) REFERENCES `specialite`(`id_specialite`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Professeurs_matieres` ADD CONSTRAINT `Professeurs_matieres_id_professeur_fkey` FOREIGN KEY (`id_professeur`) REFERENCES `Professeurs`(`id_professeur`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Professeurs_matieres` ADD CONSTRAINT `Professeurs_matieres_id_matiere_fkey` FOREIGN KEY (`id_matiere`) REFERENCES `Matieres`(`id_matiere`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Professeurs_matieres` ADD CONSTRAINT `Professeurs_matieres_id_classe_fkey` FOREIGN KEY (`id_classe`) REFERENCES `Classe`(`id_classe`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Classe` ADD CONSTRAINT `Classe_annee_academiqueId_fkey` FOREIGN KEY (`annee_academiqueId`) REFERENCES `AnneeAcademique`(`id_annee_academique`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Classe` ADD CONSTRAINT `Classe_id_filiere_fkey` FOREIGN KEY (`id_filiere`) REFERENCES `Filieres`(`id_filiere`) ON DELETE RESTRICT ON UPDATE CASCADE;
