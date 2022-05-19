import { Router } from "express";
import counterUserController from '../controllers/counterUserController';

const router = Router();

router.post('/counter/register', counterUserController.addCounterUser);  //http://localhost:5000/counter/register
router.post('/counter/login', counterUserController.login);   // http://localhost:5000/counter/login

export default router;