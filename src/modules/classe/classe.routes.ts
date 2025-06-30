import { Router } from 'express';
import { classeController, filiereController } from './classe.controller';
import { validate } from '../../middleware/validate';
import { createClasseSchema } from './classe.validation';

const router = Router();

router.get('/', classeController.findAll);
router.post('/', validate(createClasseSchema), classeController.create);

//Filiere
router.get('/filiere', filiereController.findAll);
router.post('/filiere', filiereController.create);

export default router;
