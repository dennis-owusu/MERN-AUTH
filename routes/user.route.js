import express from 'express';
import { update, deleteUser, signout } from '../controllers/user.controller.js';
import { verifyUser } from '../utils/verifyToken.js';


const router = express.Router()

router.put('/update/:userId', verifyUser, update)
router.delete('/delete/:userId', verifyUser, deleteUser)
router.post('/signout', signout)

export default router