import { Router } from 'express';
import { presenceController } from './presences.controller';

const router = Router();

router.post('/presences', presenceController.createPresence);
router.post('/absence-motifs', presenceController.createMotif);
router.post('/jours-feries', presenceController.createJourFerie);
/* router.get('/presences/:id_eleve', presenceController.getPresencesParMois);
 */router.get('/presences/:id_eleve/stats', presenceController.getStatistiquesParEleve);

export default router;
