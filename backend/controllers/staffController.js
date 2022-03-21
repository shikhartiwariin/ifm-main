import asyncHandler from 'express-async-handler'
import Staff from '../models/staffModel.js'
import StaffAttendance from '../models/staffAttendanceModel.js'

const registerStaff = asyncHandler(async (req, res) => {
    const { name, email, phone, residentialAddress,
        ID_card_Type, idNumber, staffType, photo, AppartmentID } = req.body

    const staffExists = await staff.findOne({ phone })

    if (staffExists) {
        res.status(400)
        throw new Error('Staff already registered')
    }


    const staff = await Staff.create({
        name,
        email,
        phone,
        residentialAddress,
        ID_card_Type,
        idNumber,
        staffType,
        photo,
        AppartmentID
    })

    if (staff) {
        res.status(201).json({
            _id: staff._id,
            name: staff.name,
            email: staff.email,
            phone: staff.phone,
        })
    } else {
        res.status(400)
        throw new Error('Invalid staff data')
    }
})



// @desc    Get all staff
// @route   GET /api/staffs
// @access  Private/Admin
const getStaffdetails = asyncHandler(async (req, res) => {
    const keyword = req.query.keyword
        ? {
            name: {
                $regex: req.query.keyword,
                $options: 'i',
            },
        }
        : {}
    const pageSize = 20
    const page = Number(req.query.pageNumber) || 1
    const staffs = await Staff.find({ ...keyword })
        .limit(pageSize)
        .skip(pageSize * (page - 1))
    res.json(staffs)
})

// @desc    Delete staff
// @route   DELETE /api/staff/:id
// @access  Private/Admin
const deleteStaff = asyncHandler(async (req, res) => {
    const staff = await Staff.findById(req.params.id)

    if (user) {
        await staff.remove()
        res.json({ message: 'Staff removed' })
    } else {
        res.status(404)
        throw new Error('Staff not found')
    }
})

// @desc    Get staff by ID
// @route   GET /api/staffs/:id
// @access  Private/Admin
const getStaffById = asyncHandler(async (req, res) => {
    const staff = await Staff.findById(req.params.id)

    if (staff) {
        res.json(staff)
    } else {
        res.status(404)
        throw new Error('staff not found')
    }
})

const updateStaffDetails = asyncHandler(async (req, res) => {
    const staff = await Staff.findById(req.staff._id)

    if (staff) {
        staff.name = req.body.name || staff.name
        staff.email = req.body.email || staff.email
        staff.phone = req.body.phone || staff.phone
        staff.residentialAddress = req.body.residentialAddress || staff.residentialAddress
        staff.ID_card_Type = req.body.ID_card_Type || staff.ID_card_Type
        staff.idNumber = req.body.idNumber || staff.idNumber
        staff.staffType = req.body.staffType || staff.staffType
        staff.photo = req.body.photo || staff.photo
        staff.AppartmentID = req.body.AppartmentID || staff.AppartmentID



        const updatedStaff = await staff.save()

        res.json({
            _id: updatedStaff._id,
            name: updatedStaff.name,
            email: updatedStaff.email,
            phone: updatedStaff.phone,
        })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})

const markStaffAttendance = asyncHandler(async (req, res) => {
    const { name, staffID, inTime } = req.body


    const staffAttendance = await StaffAttendance.create({
        name,
        staffID,
        inTime
    })

    if (staff) {
        res.status(201).json({
            _id: staff._id,
            name: staff.name,
        })
    } else {
        res.status(400)
        throw new Error('Invalid staff data')
    }
})

const getStaffAttendancedetails = asyncHandler(async (req, res) => {
    const keyword = req.query.keyword
        ? {
            name: {
                $regex: req.query.keyword,
                $options: 'i',
            },
        }
        : {}
    const pageSize = 20
    const page = Number(req.query.pageNumber) || 1
    const staffsAttendance = await StaffAttendance.find({ ...keyword })
        .limit(pageSize)
        .skip(pageSize * (page - 1))
    res.json(staffsAttendance)
})

const updateStaffAttendanceDetails = asyncHandler(async (req, res) => {
    const staffAttendance = await StaffAttendance.findById(req.staffAttendance._id)

    if (staffAttendance) {
        staffAttendance.outTime = req.body.outTime || staffAttendance.outTime

        const updatedStaffAttendance = await staffAttendance.save()

        res.json({
            _id: updatedStaffAttendance._id,
            name: updatedStaffAttendance.name,
            inTime: updatedStaffAttendance.inTime,
            outTime: updatedStaffAttendance.outTime,
        })
    } else {
        res.status(404)
        throw new Error('Staff not found')
    }
})