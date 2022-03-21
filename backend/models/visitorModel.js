import mongoose from 'mongoose'

const visitorSchema = mongoose.Schema(
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
    ID_card_Type: {
      type: string,
      required: true,
      default: false,
    },
    idNumber: {
      type: String,
      default: null,
    },
    purposeofVisit: { type: String },
   AppartmentID{
    type: String,
    default: null,
  },

  },
  
  {
    timestamps: true,
  }
  )
const Visitors = mongoose.model('Visitors', visitorSchema)

export default Visitors
