import express from 'express'
import { protect, admin, fbprotect } from '../middleware/authMiddleware.js'
import {
    addResident,
    getAllResidents,
    deleteResident,
    getResidentsbyID,
    getResidentsbyPrimaryMember,
    updateResidentDetails
} from '../controllers/residentController.js'

const router = express.Router()

router.route('/registerResidents').post(protect, admin,addResident).get(protect, admin, getAllResidents)
router.route('/profile').get(protect, getResidentsbyID).put(protect, updateResidentDetails)
router.route('/:id').delete(protect, admin, deleteResident)
router.route('/getResidentsbyPrimaryMember').get(protect, getResidentsbyPrimaryMember)



export default router