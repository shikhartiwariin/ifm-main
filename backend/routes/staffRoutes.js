import express from 'express'
import { protect, admin, fbprotect } from '../middleware/authMiddleware.js'

import {
    registerStaff,
    getStaffdetails,
    deleteStaff,
    getStaffById,
    updateStaffDetails,
    markStaffAttendance,
    getStaffAttendancedetails,
    updateStaffAttendanceDetails

} from '../controllers/staffController.js'

const router = express.Router()

router.route('/registerStaff').post(protect, admin,registerUser).get(protect, admin, getUsers)
router.route('/profile').get(protect, getStaffById).put(protect, updateStaffDetails)
router.route('/:id').delete(protect, admin, deleteStaff)
router.route('/StaffAttendance').post(protect,markStaffAttendance).get(protect, admin, getStaffAttendancedetails).put(protect,updateStaffAttendanceDetails)

export default router