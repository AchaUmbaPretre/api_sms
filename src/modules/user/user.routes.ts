import { Router } from 'express'
import { createUserWithEleve } from './user.controller';
const router = Router();

router.post('/user', createUserWithEleve)

export default router;