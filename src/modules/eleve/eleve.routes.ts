import { Router } from 'express';
import { eleveController } from './eleve.controller';
import { validate } from '../../middleware/validate';
import { createEleveSchema } from './eleve.validation';

const router = Router();

router.post('/', validate(createEleveSchema), eleveController.create);
router.get('/', eleveController.findAll);
router.get('/:id_eleve', eleveController.findById);
router.put('/:id_eleve', eleveController.update);
router.delete('/:id_eleve', eleveController.delete);

export default router;
