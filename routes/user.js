import express from 'express'
import { userAuth, getUser, register, clearUser, isAuth } from '../controllers/user.js'
import { authenticateToken } from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/', register)
router.post('/login', userAuth)
router.get('/auth', isAuth)
router.get('/user', authenticateToken, getUser)
router.get('/logout', authenticateToken, clearUser)

export default router