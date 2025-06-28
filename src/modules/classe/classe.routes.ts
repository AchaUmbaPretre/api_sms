import { Router } from 'express';
import { classeController } from './classe.controller';
import { validate } from '../../middleware/validate';
import { createClasseSchema } from './classe.validation';

const router = Router();

router.get('/', classeController.findAll);
router.post('/', validate(createClasseSchema), classeController.create);

export default router;
