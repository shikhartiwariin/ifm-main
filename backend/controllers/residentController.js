import asyncHandler from 'express-async-handler'
import Residents from '../models/residentsModel'

const addResident = asyncHandler(async (req, res) => {
    const { firstName, lastName, email, phone1, phone2, residentAadhar,
        AppartmentID, residentialAddress, residentType,
        IsPrimary, primaryMemberID, photo, remarks } = req.body

    const resident = await Residents.create({
        firstName, lastName, email, phone1, phone2, residentAadhar,
        AppartmentID, residentialAddress, residentType,
        IsPrimary, primaryMemberID, photo, remarks
    })

    if (resident) {
        res.status(201).json({
            _id: resident._id,
            firstName: resident.firstName,
            lastName: resident.lastName,
            email: resident.email,
            phone1: resident.phone1,
            phone2: resident.phone2,
            residentAadhar: resident.residentAadhar,
            AppartmentID: resident.AppartmentID,
            residentialAddress: resident.residentialAddress,
            residentType: resident.residentType,
            IsPrimary: resident.IsPrimary,
            primaryMemberID: resident.primaryMemberID,
            photo: resident.photo,
            remarks: resident.remarks

        })
    } else {
        res.status(400)
        throw new Error('Invalid resident data')
    }
})

// @desc    Get all resident
// @route   GET /api/residents
// @access  Private/Admin
const getAllResidents = asyncHandler(async (req, res) => {
    const keyword = req.query.keyword
        ? {
            firstName: {
                $regex: req.query.keyword,
                $options: 'i',
            },
        }
        : {}
    const pageSize = 20
    const page = Number(req.query.pageNumber) || 1
    const residents = await Residents.find({ ...keyword })
        .limit(pageSize)
        .skip(pageSize * (page - 1))
    res.json(residents)
})

const deleteResident = asyncHandler(async (req, res) => {
    const resident = await Residents.findById(req.params.id)

    if (resident) {
        await resident.remove()
        res.json({ message: 'resident removed' })
    } else {
        res.status(404)
        throw new Error('Resident not found')
    }
})

const getResidentsbyID = asyncHandler(async (req, res) => {
    const resident = await Residents.findById(req.params.id)

    if (resident) {
      res.json(resident)
    } else {
      res.status(404)
      throw new Error('Resident not found')
    }
})

const getResidentsbyPrimaryMember = asyncHandler(async (req, res) => {
    //const resident = await Residents.find('primaryMemberId' : req.params.id)
    const keyword = req.query.keyword
        ? {
            primaryMemberId: {
                $regex: req.query.keyword,
                $options: 'i',
            },
        }
        : {}

        const resident = await Residents.find({'primaryMemberid' : req.params.id})
        res.json(resident)
})

const updateResidentDetails = asyncHandler(async (req, res) => {
    const resident = await Residents.findById(req.resident._id)

    if (resident) {
        resident.firstName= req.body.firstName || resident.firstName
        resident.lastName = req.body.lastName || resident.lastName
        resident.email= req.body.email || resident.email
        resident.phone1 =  req.body.phone1 || resident.phone1
        resident.phone2 =  req.body.phone2 || resident.phone2
        resident.residentAadhar=  req.body.residentAadhar || resident.residentAadhar
        resident.AppartmentID =  req.body.AppartmentID || resident.AppartmentID
        resident.residentialAddress =  req.body.residentialAddress || resident.residentialAddress
        resident.residentType =  req.body.residentType || resident.residentType
        resident.IsPrimary =  req.body.IsPrimary || resident.IsPrimary
        resident.primaryMemberID =  req.body.primaryMemberID || resident.primaryMemberID
        resident.photo =  req.body.photo || resident.photo
        resident.remarks=  req.body.remarks ||resident.remarks



        const updatedResident = await resident.save()

        res.json({
            _id: updatedResident._id,
            firstName: updatedResident.firstName,
            lastName: updatedResident.lastName,
            email: updatedResident.email,
            phone1: updatedResident.phone1,
            phone2: updatedResident.phone2,
            residentAadhar: updatedResident.residentAadhar,
            AppartmentID: updatedResident.AppartmentID,
            residentialAddress: updatedResident.residentialAddress,
            residentType: updatedResident.residentType,
            IsPrimary: updatedResident.IsPrimary,
            primaryMemberID: updatedResident.primaryMemberID,
            photo: updatedResident.photo,
            remarks: updatedResident.remarks
        })
    } else {
        res.status(404)
        throw new Error('Resident not found')
    }
})