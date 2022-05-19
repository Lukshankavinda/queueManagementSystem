import { Router } from "express";
import normalUserController from '../controllers/normalUserController';

const router = Router();

router.post('/user/register', normalUserController.addNormalUser); // http://localhost:5000/user/register
router.post('/user/login', normalUserController.login);  // http://localhost:5000/user/login

export default router;