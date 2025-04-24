const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const catRouter = require('./routes/catRouter');
const toyRouter = require('./routes/toyRouter');
const eventRouter = require('./routes/eventRouter');
const userRouter = require('./routes/userRouter');

app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());

app.use('/api/cats', catRouter);
app.use('/api/toys', toyRouter);
app.use('/api/events', eventRouter);
app.use('/api/users', userRouter);

module.exports = app;
