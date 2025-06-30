-- CreateTable
CREATE TABLE `Notes` (
    `id_note` INTEGER NOT NULL AUTO_INCREMENT,
    `id_eleve` INTEGER NOT NULL,
    `id_matiere` INTEGER NOT NULL,
    `id_periode` INTEGER NOT NULL,
    `note` INTEGER NOT NULL,
    `type` ENUM('1P', '2P', 'Exam', 'Total', 'Repechage') NOT NULL DEFAULT '1P',
    `date_creation` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id_note`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Notes` ADD CONSTRAINT `Notes_id_eleve_fkey` FOREIGN KEY (`id_eleve`) REFERENCES `Eleve`(`id_eleve`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Notes` ADD CONSTRAINT `Notes_id_matiere_fkey` FOREIGN KEY (`id_matiere`) REFERENCES `Matieres`(`id_matiere`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Notes` ADD CONSTRAINT `Notes_id_periode_fkey` FOREIGN KEY (`id_periode`) REFERENCES `Periodes`(`id_periode`) ON DELETE RESTRICT ON UPDATE CASCADE;
