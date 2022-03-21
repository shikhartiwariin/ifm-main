import express from 'express'
const router = express.Router()
import {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUserByAdmin,
  firebaseAuthUser,
  firebaseRegister,
} from '../controllers/userController.js'
import { protect, admin, fbprotect } from '../middleware/authMiddleware.js'


router.route('/').post(registerUser).get(protect, admin, getUsers)
router.post('/login', authUser)
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile) //updateUserProfile is done by user
router.route('/:id').delete(protect, admin, deleteUser).get(protect, admin, getUserById).put(protect, admin, updateUserByAdmin)

//This is the replacement for /login route:
router.route('/firebaseAuthUser/:upsert').post(fbprotect, firebaseAuthUser) //We will do the firebase Token validation only here.
router.route('/firebaseRegister').post(fbprotect, firebaseRegister) //We will do the firebase Token validation only here.



//For All other cases we will do the local token validation

export default router
