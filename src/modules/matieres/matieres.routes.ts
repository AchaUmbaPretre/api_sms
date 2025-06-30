import { Router } from 'express';
import { matiereController } from './matieres.controller';

const router = Router();

router.post('/', matiereController.create);
router.get('/', matiereController.findAll);
router.put('/:id_parent', matiereController.update);
router.delete('/:id_parent', matiereController.delete);

export default router;