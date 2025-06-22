import { Router } from 'express';
import { classeController } from './classe.controller';

const router = Router();

router.get('/', classeController.findAll);
router.post('/', classeController.create);