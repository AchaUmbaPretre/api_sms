import { Router } from 'express';
import { profMatiereController } from './professeursMatieres.controller';

const router = Router();

router.post('/', profMatiereController.create);
router.get('/', profMatiereController.findAll);
router.put('/:id_prof_matiere', profMatiereController.update);
router.delete('/:id_prof_matiere', profMatiereController.delete);

export default router;