const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors'); // Используем стандартный cors
const morgan = require('morgan');
const catRouter = require('./routes/catRouter');
const toyRouter = require('./routes/toyRouter');
const eventRouter = require('./routes/eventRouter');
const userRouter = require('./routes/userRouter');
const tokensRouter = require('./routes/tokensRouter');
const authRouter = require('./routes/authRouter');
const achievementRouter = require('./routes/achievementRouter');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors()); 
app.use(express.static('public'));
app.use(morgan('dev'));

app.use('/api/cats', catRouter);
app.use('/api/toys', toyRouter);
app.use('/api/events', eventRouter);
app.use('/api/users', userRouter);
app.use('/api/tokens', tokensRouter);
app.use('/api/auth', authRouter);
app.use('/api/achievements', achievementRouter);

module.exports = app;
