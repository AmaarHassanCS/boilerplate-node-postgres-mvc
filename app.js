const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, './.env') });

const express = require('express');
const bodyParser = require('body-parser');

const { sequelize } = require('./models');
const { jwtMiddleware, requestValidation } = require('./middlewares');
const authRouter = require('./routes/auth');
const adminRouter = require('./routes/admin');
const membershipRouter = require('./routes/memberships');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

// middleware for route
app.use('/auth', authRouter);
app.use('/admin', jwtMiddleware, requestValidation, adminRouter);
app.use('/membership', jwtMiddleware, membershipRouter);

sequelize
    .sync({
        // force: true
    })
    .then(() => {
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log('App is running at http://localhost:%d ', PORT);
        });
    })
    .catch(err => {
        console.error(err);
    });