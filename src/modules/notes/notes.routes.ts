import { Router } from 'express';
import { notesController, periodeController } from './notes.controller';

const router = Router();

router.post('/', notesController.create);
router.get('/', notesController.findAll);
router.put('/:id_note', notesController.update);
router.delete('/:id_note', notesController.delete);

//Periode
router.post('/periode', periodeController.create);
router.get('/periode', periodeController.findAll);

export default router;