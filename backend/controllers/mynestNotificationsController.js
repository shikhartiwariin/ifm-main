import asyncHandler from 'express-async-handler'
import MynestNotifications from '../models/mynestNotificationsModel'

const addNotifications = asyncHandler(async (req, res) => {
    const { title, description, startDate, endDate, visibilityGroup, isActive,
        createdBy, verifiedBy} = req.body

    const notification = await MynestNotifications.create({
        title, description, startDate, endDate, visibilityGroup, isActive,
        createdBy, verifiedBy
    })

    if (notification) {
        res.status(201).json({
            _id: notification._id,
            title: notification.title,
            description: notification.description,
            startDate: notification.startDate,
            endDate: notification.endDate,
            visibilityGroup: notification.visibilityGroup,
            isActive: notification.isActive,
            createdBy: notification.createdBy,
            verifiedBy: notification.verifiedBy,           
        })
    } else {
        res.status(400)
        throw new Error('Invalid resident data')
    }
})

const getAllNotifications = asyncHandler(async (req, res) => {
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
    const notifications = await MynestNotifications.find({ ...keyword })
        .limit(pageSize)
        .skip(pageSize * (page - 1))
    res.json(notifications)
})

const deleteNotifications = asyncHandler(async (req, res) => {
    const notification = await MynestNotifications.findById(req.params.id)

    if (resident) {
        await notification.remove()
        res.json({ message: 'notification removed' })
    } else {
        res.status(404)
        throw new Error('notification not found')
    }
})
