import mongoose from 'mongoose'
import dotenv from 'dotenv'
import colors from 'colors'
import users from '../../seed_data/data/users.js'


import User from '../../models/userModel.js'


import connectDB from '../../config/db.js'

import csv from 'fast-csv'

dotenv.config()

connectDB()

const importData = async () => {
  try {

    await User.deleteMany()


    const createdUsers = await User.insertMany(users)

    const adminUser = createdUsers[0]._id

    console.log('Data Imported!'.green.inverse)
    //process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}

const destroyData = async () => {
  try {
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()
    await Category.deleteMany()

    console.log('Data Destroyed!'.red.inverse)
    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}



if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}