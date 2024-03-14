import express from 'express';
import { loginUser, registerUser } from '../controllers/user.controller.js';

const router = express.Router();

router.post('/register', registerUser )
router.get('/', (req, res) => {
    res.send("get all users")
} )
router.post('/login', loginUser)


export default router;