import { Router } from "express";
import issuesController from '../controllers/issuesController';
import auth from '../middleware/auth';
const router = Router();

router.post('/user/addi',auth, issuesController.addIssue); // http://localhost:5000/user/addi
router.get('/counter/getAll',auth, issuesController.getAllIssues); // http://localhost:5000/counter/getAll
router.delete('/user/deleteIssue/:id',auth, issuesController.deleteIssues); // http://localhost:5000/user/deleteIssue/

export default router;