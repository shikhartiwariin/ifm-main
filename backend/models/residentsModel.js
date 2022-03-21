import mongoose from 'mongoose'

const residentSchema = mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: false,
        },
        email: {
            type: String,
            unique: true,
        },
        phone1: {
            type: String,
            required: true,
            unique: true,
        },
        phone2: {
            type: String,
            required: true,
            unique: true,
        },
        residentAadhar: {
            type: String,
            required: true,
            unique: true,
        },
        AppartmentID{
    type: String,
    default: null,
},
    residentialAddress: {
    type: String,
    required: true,
}
    residentType: {
    type: string,
    required: true,
},
    IsPrimary: {
    type: Boolean,
    required: true,
    default: false,
},
    primaryMemberID: {
    type: string,
    required: false,
},
    photo: { type: String },
    remarks: {
    type: string,
    required: false,
},

  },

{
    timestamps: true,
  }
  )
const Residents = mongoose.model('residents', residentSchema)

export default Residents
