import { Router } from 'express';
import { parentController } from './parent.controller';

const router = Router();

router.post('/', parentController.create);
router.get('/', parentController.findAll);
router.put('/:id_parent', parentController.update);
router.delete('/:id_parent', parentController.update);

export default router;