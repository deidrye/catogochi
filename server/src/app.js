const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('./middlewares/cors');
const app = express();
const tokensRouter = require('./routes/tokensRouter');
const authRouter = require('./routes/authRouter');

app.use(cors);
app.use(express.static('public'));
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use('/api/auth', authRouter);
app.use('/api/tokens', tokensRouter);

module.exports = app;
