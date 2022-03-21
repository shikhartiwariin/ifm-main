import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'
import User from '../models/userModel.js'

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email } = req.body
  const user = await User.findOne({ email })
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    })
  } else {
    res.status(401)
    throw new Error('Invalid User')
  }
})

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email } = req.body

  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  const user = await User.create({
    name,
    email,
  })

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
      customers: user.customers

    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      isAdmin: user.isAdmin,
      vendorId: user.vendorId,
      shippingAddress: user.shippingAddress,
      prefferedVendors: user.prefferedVendors,
      customers: user.customers

    })
    // res.json({data:user})
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    user.name = req.body.name || user.name
    user.shippingAddress = req.body.shippingAddress || user.shippingAddress
    user.phone = req.body.phone || user.phone

    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      phone: updatedUser.phone,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
      shippingAddress: updatedUser.shippingAddress,
      customers: user.customers

    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
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
  const users = await User.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1))
  res.json(users)
})

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (user) {
    await user.remove()
    res.json({ message: 'User removed' })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (user) {
    res.json(user)
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUserByAdmin = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (user) {
    user.name = req.body.name || user.name
    // user.email = req.body.email || user.email
    user.isAdmin = req.body.isAdmin

    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      userType: updatedUser.userType,
      userRole: updatedUser.userRole,

    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// @desc    user profile update with Firebase
// @route   PUT /api/users/fbprofile
// @access  Private
const firebaseAuthUser = asyncHandler(async (req, res) => {
  if (!req.user.email) {
    res.status(404)
    throw new Error('Email is missing')
  }

  const upsert = req.params.upsert

  let user = await User.findOne({ email: req.user.email })

  if (!user && upsert === 'true') {
    const username = req.body.name || 'Guest'
    user = await User.create({
      name: username,
      email: req.user.email,
    })
  }

  if (!user) {
    res.status(404)
    throw new Error('User not found')
  }
  const { _id, name, email, isAdmin, vendorId, customers} = user

  res.json({
    _id,
    name,
    email,
    isAdmin,
    vendorId,
    customers,


    token: generateToken(_id),
  })
})

// @desc    Register a new user
// @route   POST /api/users/firebaseRegister
// @access  Public
const firebaseRegister = asyncHandler(async (req, res) => {
  if (!req.user.email) {
    res.status(404)
    throw new Error('Email is missing')
  }

  let userExists = await User.findOne({ email: req.user.email })
  if (userExists) {
    res.status(400)
    throw new Error('User already exists. Use Sign in')
  }

  const { name, email } = req.body

  const user = await User.create({
    name,
    email,
  })

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
      customers: user.customers,
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

export {
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
}
