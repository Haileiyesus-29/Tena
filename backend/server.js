require('dotenv').config()
require('express-async-errors')
const express = require('express')
const mongoose = require('mongoose')
const {
   errorHandler,
   internalErrorsHanlder,
} = require('./api/middlewares/errorHandler')

const app = express()
const PORT = process.env.SERVER_PORT || 5000

app.use(express.json())

const userRoutes = require('./api/routes/user.route')
const hospitalRoutes = require('./api/routes/hospital.route')
const doctorRoutes = require('./api/routes/doctor.route')
const appointmentRoutes = require('./api/routes/appointment.route')
const paymentRoutes = require('./api/routes/payment.route')
const messageRoutes = require('./api/routes/message.route')
const loginRoute = require('./api/routes/login.route')

app.use('/api/users', userRoutes)
app.use('/api/hospitals', hospitalRoutes)
app.use('/api/doctors', doctorRoutes)
app.use('/api/appointments', appointmentRoutes)
app.use('/api/payments', paymentRoutes)
app.use('/api/messages', messageRoutes)
app.use('/api/login', loginRoute)

app.use(errorHandler)
app.use(internalErrorsHanlder)

mongoose
   .connect(process.env.DB_URI)
   .then(() => {
      app.listen(PORT, () =>
         console.log(`Server running on http://localhost:${PORT} 🚀`)
      )
   })
   .catch(err => {
      console.trace(err)
   })
