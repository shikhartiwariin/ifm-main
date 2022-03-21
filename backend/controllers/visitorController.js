import asyncHandler from 'express-async-handler'
import Visitors from '../models/visitorModel.js'

const registerVisitor = asyncHandler(async (req, res) => {
  const { name, email, phone,
    ID_card_Type, idNumber, purposeofVisit, AppartmentID } = req.body

  const visitor = await Visitors.create({
    name,
    email, phone,
    ID_card_Type,
    idNumber,
    purposeofVisit,
    AppartmentID
  })

  if (visitor) {
    res.status(201).json({
      _id: visitor._id,
      name: visitor.name,
      email: visitor.email,
      phone: visitor.phone,
      token: generateToken(visitor._id),
      ID_card_Type: visitor.ID_card_Type,
      idNumber: visitor.idNumber,
      purposeofVisit: visitor.purposeofVisit,
      AppartmentID: visitor.AppartmentID

    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})



// @desc    Get all users
// @route   GET /api/visitors
// @access  Private/Admin
const getVisitors = asyncHandler(async (req, res) => {
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
  const visitors = await Visitors.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1))
  res.json(visitors)
})

// @desc    Delete visitors
// @route   DELETE /api/visitors/:id
// @access  Private/Admin
const deleteVisitor = asyncHandler(async (req, res) => {
  const visitor = await Visitors.findById(req.params.id)

  if (visitor) {
    await visitor.remove()
    res.json({ message: 'Visitor removed' })
  } else {
    res.status(404)
    throw new Error('Visitor not found')
  }
})

// @desc    Get visitor by ID
// @route   GET /api/visitors/:id
// @access  Private/Admin
const getVisitorById = asyncHandler(async (req, res) => {
  const visitor = await Visitors.findById(req.params.id)

  if (visitor) {
    res.json(visitor)
  } else {
    res.status(404)
    throw new Error('Visitor not found')
  }
})


