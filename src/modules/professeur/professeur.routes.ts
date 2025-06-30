import { Router } from 'express';
import { professeurController, specialiteController } from './professeur.controller';

const router = Router();

router.post('/', professeurController.create);
router.get('/', professeurController.findAll);
router.put('/:id_professeur', professeurController.update);
router.delete('/:id_professeur', professeurController.update);

router.post('/specialite', specialiteController.create);
router.get('/specialite', specialiteController.findAll);
router.put('/specialite/:id_specialite', specialiteController.update);
router.delete('/specialite/:id_specialite', specialiteController .update);

export default router;