import express from 'express';
import { createTask, readAllTask, readSingleTask } from '../controllers/taskController.js';
const router=express.Router()

router.post('/', createTask )
router.get('/', readAllTask )
router.get('/:id', readSingleTask )
export default router;