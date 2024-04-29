import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import authRoute from './routes/auth.route.js'
import userRoute from './routes/user.route.js'
import cookieParser from 'cookie-parser'

dotenv.config()
const PORT = 3000
const app = express()

app.use(express.json())
app.use(cookieParser())

mongoose.connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("MongoDB connected")
})

app.use('/api/auth', authRoute)
app.use('/api/user', userRoute)

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500
  const message = err.message || 'Internal Server Error'
  res.json({
    success: false,
    statusCode,
    message
  })
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})