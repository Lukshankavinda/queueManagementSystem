import { Router } from "express";
import counterUserController from '../controllers/counterUserController';
import counterController from "../controllers/counterController";
import auth from '../middleware/auth';

const router = Router();

router.post('/counter/register', counterUserController.addCounterUser);  //http://localhost:5000/counter/register
router.post('/counter/login', counterUserController.login);   // http://localhost:5000/counter/login
router.put('/counter/close',auth, counterController.closeCounter);   // http://localhost:5000/counter/close
router.get('/counter/getCounter',auth, counterController.getCounter );  // http://localhost:5000/counter/getCounter  

export default router;