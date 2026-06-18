import express from 'express';
import { register, login } from '../controllers/auth.controller.js';
import { validate, authSchemas } from '../middlewares/validator.js';

const router = express.Router();

router.post('/register', validate(authSchemas.register), register);
router.post('/login', validate(authSchemas.login), login);

export default router;