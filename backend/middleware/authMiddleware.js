import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
//import { firebaseAdmin } from '../firebase/index.js'

const protect = asyncHandler(async (req, res, next) => {
  let token

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
        token = req.headers.authorization.split(' ')[1]

      const decoded = jwt.verify(token, process.env.JWT_SECRET)

     // RVT_LEARNING: select statement to add and remove some fields
      req.user = await User.findById(decoded.id)
      next()
    } catch (error) {
      console.error(error)
      res.status(401)
      throw new Error('Not authorized, token failed')
    }
  }

  if (!token) {
    res.status(401)
    throw new Error('Not authorized, no token')
  }
})

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next()
  } else {
    res.status(401)
    throw new Error('Not authorized as an admin')
  }
}

const vendor = (req, res, next) => {
  if (req.user && req.user.vendorId) {
    next()
  } else {
    res.status(401)
    throw new Error('Not authorized as an Vendor')
  }
}

const fbprotect = asyncHandler(async (req, res, next) => {
  // let token

  // if (req.headers.authorization && req.headers.authorization.startsWith('firbaseToken')) {
  //   try {
  //     token = req.headers.authorization.split(' ')[1]

  //     const firebaseUser = await firebaseAdmin.auth().verifyIdToken(token)
  //     req.user = firebaseUser
  //     next()
  //   } catch (error) {
  //     console.error(error)
  //     res.status(401)
  //     throw new Error('Not authorized, token failed')
  //   }
  // }

  // if (!token) {
  //   res.status(401)
  //   throw new Error('Not authorized, no token')
  // }
})

export { protect, admin, fbprotect, vendor }
