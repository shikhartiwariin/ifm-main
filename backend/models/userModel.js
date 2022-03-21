import mongoose from 'mongoose'

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    userType: {
      type: String,
      default: null,
    },
    phone: { type: String },
   userRole: {
      type: String,
      default: null,
    },
  userAccess: {
        type: String,
        default: null,
      },

  },
  
  {
    timestamps: true,
  }
  )
const User = mongoose.model('User', userSchema)

export default User
