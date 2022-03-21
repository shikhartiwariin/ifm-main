import mongoose from 'mongoose'

const staffAttendanceSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
 staffID : {
    type: String,
    required: true,
  },
  inTime : {
    type: String,
    required: true,
  },
  outTime : {
    type: String,
    required: true,
  },

  },
  
  {
    timestamps: true,
  }
  )
const StaffAttendance = mongoose.model('StaffAttendance', staffAttendanceSchema)

export default StaffAttendance
