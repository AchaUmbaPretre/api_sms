import { Router } from 'express';
import { presenceController } from './presences.controller';

const router = Router();

router.post('/', presenceController.createPresence);
router.post('/absence-motifs', presenceController.createMotif);
router.post('/jours-feries', presenceController.createJourFerie);

/* router.get('/classe/:id_classe', presenceController.getPresencesParClasseEtMois);
 */router.get('/eleve/:id_eleve/stats', presenceController.getStatistiquesParEleve);
/* router.get('/eleve/:id_eleve', presenceController.getPresencesParMois);
 */
export default router;
