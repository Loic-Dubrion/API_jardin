const path = require('path');
const express = require('express');
const cors = require('cors');
const router = require('./routers');
const swagger = require('./helpers/swagger');

const app = express();

// Swagger setup
swagger(app, path.join(__dirname, 'routers'));

// CORS setup
const corsOptions = {
  origin: process.env.CORS_DOMAINS ?? '*',
};

// Middlewares setup
app.use(cors(corsOptions));
app.use(express.json());

app.use(router);

module.exports = app;
