// src/cors.js
const corsOptions = {
  origin: '*', // orice origine permisă
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 204,
};

module.exports = corsOptions;
