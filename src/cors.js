// src/cors.js
const corsOptions = {
  origin: [
    'https://ionelab22.github.io', // frontend live pe GitHub Pages
    'https://health-monitor-node.onrender.com', // backend live pe Render
    'http://localhost:3000', // pentru development
    'http://localhost:5173',
  ],
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  credentials: true,
  optionsSuccessStatus: 204,
};

module.exports = corsOptions;
