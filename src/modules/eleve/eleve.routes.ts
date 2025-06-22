import { Router } from 'express';
import { eleveController } from './eleve.controller';

const router = Router();

router.post('/', eleveController.create);
router.get('/', eleveController.findAll);
router.get('/:id_eleve', eleveController.findById);
router.put('/:id_eleve', eleveController.update);
router.delete('/:id_eleve', eleveController.delete);

export default router;
