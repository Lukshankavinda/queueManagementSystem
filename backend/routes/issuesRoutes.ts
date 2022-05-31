import { Router } from "express";
import issuesController from '../controllers/issuesController';
import counterController from '../controllers/counterController';
import auth from '../middleware/auth';
const router = Router();

router.post('/user/addi',auth, issuesController.addIssue); // http://localhost:5000/user/addi
router.get('/counter/getAll',auth, issuesController.getAllIssues); // http://localhost:5000/counter/getAll
router.get('/counter/getOne/:id',auth, issuesController.getOneIssues); // http://localhost:5000/counter/getOne
router.put('/user/deleteIssue/:id',auth, issuesController.deleteIssues); // http://localhost:5000/user/deleteIssue/
router.put('/counter/deleteIssue/:id',auth, issuesController.deleteIssues); // http://localhost:5000/counter/deleteIssue/
router.get('/counter/doneNext/:id',auth, issuesController.doneNext); // http://localhost:5000/counter/doneNext


export default router;