const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const corsMiddleware = require('./middlewares/cors');
const morgan = require('morgan');

const catRouter = require('./routes/catRouter');
const toyRouter = require('./routes/toyRouter');
const eventRouter = require('./routes/eventRouter');
const userRouter = require('./routes/userRouter');
const tokensRouter = require('./routes/tokensRouter');
const authRouter = require('./routes/authRouter');
const achievementRouter = require('./routes/achievementRouter');
const userLogRouter = require('./routes/userLogRouter');

// Middleware setup
app.use(morgan('dev')); // Первым (для логов)
app.use(corsMiddleware); // Сразу после логов!
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static('public'));

// Routers
app.use('/api/tokens', tokensRouter);
app.use('/api/auth', authRouter);
app.use('/api/cats', catRouter);
app.use('/api/toys', toyRouter);
app.use('/api/events', eventRouter);
app.use('/api/users', userRouter);
app.use('/api/achievements', achievementRouter);
app.use('/api/logs', userLogRouter);

module.exports = app;
