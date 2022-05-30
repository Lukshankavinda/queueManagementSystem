import { Router } from "express";
import normalUserController from '../controllers/normalUserController';
import counterController from "../controllers/counterController";
import auth from '../middleware/auth';

const router = Router();

router.post('/user/register', normalUserController.addNormalUser); // http://localhost:5000/user/register
router.post('/user/login', normalUserController.login);  // http://localhost:5000/user/login
router.get('/user/ongoing',auth, counterController.onGoingQueue);  // http://localhost:5000/user/ongoing  
router.get('/user/isAdd/:email', counterController.isIssueAdded);  // http://localhost:5000/user/isAdd

export default router;