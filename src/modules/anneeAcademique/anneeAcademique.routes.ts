import { Router } from 'express';
import { anneeAcademiqueController } from './anneeAcademique.controller';
const router = Router();

router.post('/',anneeAcademiqueController.create);
router.get('/', anneeAcademiqueController.findAll);

export default router;
