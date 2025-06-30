import { prisma } from '../../config/prisma';

interface CreateNoteDTO {
    id_note: number;
    id_eleve: number;
    id_matiere: number;
    id_periode: number;
    note: number
}

interface CreatePeriodeDTO {
    nom_periode: string
}

export const notesService = {
    async createdNotes(data: CreateNoteDTO) {
        const {
            id_eleve,
            id_matiere,
            id_periode,
            note
        } = data;

        try {
            return await prisma.notes.create({
                data: {
                    id_eleve,
                    id_matiere,
                    id_periode,
                    note
                }
            });
        } catch (error) {
            console.error('[noteService][createNoteService] Erreur :', error);
            throw new Error("Impossible de créer une note");
        }
    },

    async findAll() {
        return await prisma.classe.findMany()
    },

    async findById(id_note: number) {
        const note = await prisma.notes.findUnique({
            id_note
        });

        if(!note) {
            throw new Error('Note introuvable');
        }
        return note;
    },

    async update(id_note: number, data: CreateNoteDTO) {
        try {
            return await prisma.notes.update({
                where: { id_note },
                data
            })
        } catch (error) {
            console.error('[NoteService][update] Erreur :', error);
            throw new Error("Impossible de mettre à jour la note");
        }
    },

    async delete(id_note: number) {
        try {
            const note = await prisma.notes.delete({ where: id_note })
        } catch (error) {
            console.error('[NoteService][delete] Erreur :', error);
            throw new Error("Impossible de supprimer cette note");
        }
    }
}

export const periodeService = {
    async createdNotes(data: CreatePeriodeDTO) {
        const {
            nom_periode
        } = data;

        try {
            return await prisma.periodes.create({
                data: {
                    nom_periode
                }
            });
        } catch (error) {
            console.error('[periodeService] Erreur :', error);
            throw new Error("Impossible de créer une note");
        }
    },

    async findAll() {
        return await prisma.periodes.findMany()
    }
}