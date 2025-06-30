import { Router } from 'express';
import { eleveController, eleveParentController } from './eleve.controller';
import { validate } from '../../middleware/validate';
import { createEleveSchema } from './eleve.validation';
import { eleveParentService } from './eleve.service';

const router = Router();

router.post('/', validate(createEleveSchema), eleveController.create);
router.get('/', eleveController.findAll);
router.get('/:id_eleve', eleveController.findById);
router.put('/:id_eleve', eleveController.update);
router.delete('/:id_eleve', eleveController.delete);

router.post('/eleve_parent', eleveParentController.create);
router.get('/eleve_parent', eleveParentController.findAll);
router.get('/eleve_parent/:id_eleve_parent', eleveParentController.findById);
router.put('/eleve_parent/:id_eleve_parent', eleveParentController.update);
router.delete('/eleve_parent/:id_eleve_parent', eleveParentController.delete);


export default router;
