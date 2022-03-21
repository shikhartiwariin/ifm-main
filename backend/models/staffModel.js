import mongoose from 'mongoose'

const staffSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
    },
    phone: {
        type: String,
        required: true,
        unique: true,
      },
    residentialAddress: {
      type: String,
      required: true,
      unique: true,
    }
    ID_card_Type: {
      type: string,
      required: true,
      default: false,
    },
    idNumber: {
      type: String,
      default: null,
    },
    staffType: {
        type: string,
        required: true,
        default: false,
      },
    photo: { type: String },
   AppartmentID{
    type: String,
    default: null,
  },

  },
  
  {
    timestamps: true,
  }
  )
const Staff = mongoose.model('Staff', staffSchema)

export default Staff
