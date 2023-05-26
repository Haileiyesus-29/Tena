function errorHandler(err, req, res, next) {
   // Default error values
   let statusCode = 500
   let message = 'Internal Server Error'

   // Check for specific error properties
   if (err.statusCode) {
      statusCode = err.statusCode
   }

   if (err.message) {
      message = err.message
   }

   // Handle Mongoose validation errors
   if (err.name === 'ValidationError') {
      statusCode = 400
      message = 'Validation Error'
   }

   // Log the error for debugging (optional)
   console.error(err)

   // Return the error response
   res.status(statusCode).json({ error: message })
}

module.exports = { errorHandler }
