import express from 'express'
import { protect, admin, fbprotect } from '../middleware/authMiddleware.js'

import {
    registerVisitor,
    getVisitors,
    deleteVisitor,
    getVisitorById

} from '../controllers/visitorController.js'

const router = express.Router()

router.route('/registerVisitor').post(protect, admin,registerVisitor).get(protect, admin, getVisitors)
router.route('/:id').delete(protect, admin, deleteVisitor).get(protect, admin, getVisitorById)

export default router