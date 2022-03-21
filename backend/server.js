import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import morgan from 'morgan'

dotenv.config()

import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import connectDB from './config/db.js'

import userRoutes from './routes/userRoutes.js'
import visitorRoutes from '.routes/visitorRoutes.js'
import staffRoutes from './routes/staffRoutes.js'
import residentRoutes from './routes/residentRoutes.js'

import './services/cache.js'

connectDB()

const app = express()

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use(express.json())

app.use('/api/users', userRoutes)
app.use('/api/visitors', visitorRoutes)
app.use('/api/staff', staffRoutes)
app.use('/api/residents', residentRoutes)

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')))

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  )
} else {
  app.get('/', (req, res) => {
    res.send('API is running....')
  })
}

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 3000

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold)
)
