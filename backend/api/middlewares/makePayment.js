const Payment = require('../models/payment.model')

async function makePayment(req, res, next) {
   const { amount, method } = req.body
   if (!amount) return next({ message: 'Bad Request', status: 400 })

   try {
      const payment = new Payment({
         amount,
         method,
         user: req.userId,
         hospital: req.hospitalId,
      })
      await payment.save()
      if (!payment) throw Error()
      req.paymentId = payment._id
      next()
   } catch (error) {
      next(error)
   }
}

module.exports = makePayment
