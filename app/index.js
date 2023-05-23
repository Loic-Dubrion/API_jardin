const path = require('path');
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const router = require('./routers');

const auth = require('./helpers/authentification');
const swagger = require('./helpers/swagger');

const app = express();

// Session setup
app.use(
  session({
    saveUninitialized: true,
    resave: true,
    secret: 'Shhh! It\'s a secret...',
  }),
);

// Swagger setup
swagger(app, path.join(__dirname, 'routers'));

// CORS setup
const corsOptions = {
  origin: process.env.CORS_DOMAINS ?? '*',
};

// Middlewares setup
app.use(cors(corsOptions));
app.use(express.json());
app.use(auth);

// Routers
app.use(router);

module.exports = app;
