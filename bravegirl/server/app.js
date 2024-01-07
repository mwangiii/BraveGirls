const express = require('express');
const session = require('express-session');
require('dotenv').config();
const passport = require('passport');

// create express app
const app = express();

// home route
app.use('/', (req, res) => {
    res.json({
        message: 'Welcome to BraveGirl Backend API',
        Version: '1.0.0',
        description: 'This is a REST API for BraveGirl',
        documentation: 'https://documenter.getpostman.com/view/11537359/TzJx7G9E'
    });
});

// use express session middleware
app.use(session({
    secret: process.env.SESSION_SECRET, // use an environment variable for the secret
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

// use passport middleware
app.use(passport.initialize());
app.use(passport.session());
// parse Json Bodies
app.use(express.json());
// Import route files
const usersRoutes = require('./routes/v1/users');
const blogRoutes = require('./routes/v1/blog');
const volunteeropportunityRoutes = require('./routes/v1/volunteeropportunity');


// mount route files
app.use('/api/v1/users/', usersRoutes);
app.use('/api/v1/blog/', blogRoutes);
app.use('/api/v1/volunteeropportunity/', volunteeropportunityRoutes);

// add logging middleware
app.use((req, res, next) => {
    const start = Date.now();
    res.on('finish', () => {
      const duration = Date.now() - start;
      console.log(`${req.method} ${req.originalUrl} ${res.statusCode} ${duration}ms`);
    });
    next(); 
  });
module.exports = app;