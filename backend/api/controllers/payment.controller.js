const Payment = require('../models/payment.model')

// Get all Payment
const getAllPayments = async (req, res, next) => {
   try {
      const payments = await Payment.find({
         [req.accountType]: req.userId,
      })
         .select('timestamp hospital patient')
         .populate('hospital user', 'name')

      const formattedPayment = payments.map(payment => {
         return {
            id: payment._id,
            timestamp: payment.timestamp,
            user: payment?.user?.name,
            hospital: payment?.hospital?.name,
         }
      })

      res.status(200).json(formattedPayment)
   } catch (error) {
      next(error)
   }
}

// Get Payment by ID
const getPaymentById = async (req, res, next) => {
   try {
      const paymentId = req.params.id
      const payment = await Payment.findOne({
         _id: paymentId,
         [req.accountType]: req.userId,
      }).populate('hospital user', 'name')

      if (!payment) {
         return res.status(404).json({ message: 'payment not found' })
      }

      const formattedPayment = {
         id: payment._id,
         amount: payment.amount,
         method: payment.method,
         timestamp: payment.timestamp,
         hospital_id: payment?.hospital?._id,
         hospital: payment?.hospital?.name,
         user_id: payment?.user?._id,
         user: payment?.user?.name,
      }

      res.status(200).json(formattedPayment)
   } catch (error) {
      next(error)
   }
}

module.exports = {
   getAllPayments,
   getPaymentById,
}
