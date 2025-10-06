/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const express = require('express');
const logger = require('morgan');
const passport = require('./passport/passportConfig');
const cors = require('cors');
const corsOptions = require('./cors');

const authRouter = require('./routes/api/authRoutes');
const privateRouter = require('./routes/api/privateRoutes');
const healthRouter = require('./routes/api/healthRoutes');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./docs/swagger.json');
const path = require('path');
require('dotenv').config();

const app = express();

// 🔹 Setează logger-ul
const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';
app.use(logger(formatsLogger));

// 🔹 CORS pentru GitHub Pages + Render
app.use(
  cors({
    origin: [
      'https://ionelab22.github.io', // site-ul tău GitHub Pages
      'https://health-monitor-node.onrender.com', // backendul tău Render
      'http://localhost:5173', // local frontend (vite)
      'http://localhost:3000', // local fallback
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// 🔹 Swagger Docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// 🔹 Rutele API
app.use('/api', authRouter);
app.use('/api', privateRouter);
app.use('/api', healthRouter);

// 🔹 Health check pentru Render
app.get('/healthz', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// 🔹 Passport init
app.use(passport.initialize());

// 🔹 404
app.use((_, res, __) => {
  res.status(404).json({
    status: 'error',
    code: 404,
    message: 'Use API on routes: /api/users, /api/private or /api/public',
    data: 'Not found',
  });
});

// 🔹 500
app.use((err, _, res, __) => {
  console.error(err.stack);
  res.status(500).json({
    status: 'fail',
    code: 500,
    message: err.message,
    data: 'Internal Server Error',
  });
});

module.exports = app;
