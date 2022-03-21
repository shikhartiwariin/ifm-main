import mongoose from 'mongoose'

const mynestNotificationsSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: false,
        },
        startDate: {
            type: String,
            required: false,
        },
        endDate: {
            type: String,
            required: false,
        },
        visibilityGroup: {
            type: String,
            required: false,
        },
        isActive: {
            type: Boolean,
            required: false,
        },
        createdBy: {
            type: String,
            required: false,
        },
        verifiedBy: {
            type: String,
            required: false,
        },

  },

{
    timestamps: true,
  }
  )
const MynestNotifications = mongoose.model('mynestNotifications', mynestNotificationsSchema)

export default MynestNotifications
