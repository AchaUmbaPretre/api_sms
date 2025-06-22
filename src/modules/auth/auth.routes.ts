import { Router } from 'express';
import { login, register } from './auth.controller';
import { loginSchema, registerSchema } from './auth.validation';
import { validate } from './../../middleware/validate';

const router = Router();

router.post('/login', validate(loginSchema), login);
router.post('/register', validate(registerSchema), register);

export default router;