const rateLimit = require('express-rate-limit');
const { TooManyRequests } = require('../utils/errorHandler');

const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 60 minutes
  max: 25, // Limit each IP to 25 requests per `window` (here, per 60 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: {
    status: 429,
    message:
      'Limited to 25 requests an hour, Please come back in an hour to continue using the hot words compare.',
  },
});

module.exports = {
  limiter,
};

