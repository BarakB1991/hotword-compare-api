const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');

const { PORT } = require('./utils/constants');
const app = express();
const { limiter } = require('./middlewares/rateLimiter');
const indexRouter = require('./routes');
const centralErrHandler = require('./middlewares/centralErrHandler');
const { CLIENT_URL } = require('./utils/constants');

app.use(morgan('common'));
app.use(helmet());
app.use(
  cors({
    origin: [CLIENT_URL],
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }),
);

app.use(bodyParser.json());
app.use(limiter);

app.get('/', (req, res) => {
  res.send({ res: 'Hello World!' });
});

app.use('/api/v1', indexRouter);

app.use(centralErrHandler);

app.listen(PORT, () => {
  console.log('Hot words compare API running on port ' + PORT);
});

module.exports = app;
