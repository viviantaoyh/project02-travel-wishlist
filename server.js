require('dotenv').config();

const express = require('express');
const expressLayouts = require('express-ejs-layouts')
const requestLogger = require('./middlewares/request_logger');
const reqBodyMethodOverride = require('./middlewares/method_override');
const setCurrentUser = require('./middlewares/set_current_user');
const ensureLoggedIn = require('./middlewares/ensure_logged_in');
const database = require('./db/index');
const bcrypt = require('bcrypt');
const session = require('express-session');
const destinationRouter = require('./routes/destination_routes');
const sessionRouter = require('./routes/sessions_routes');
const usersRouter = require('./routes/users_routes')
const pageRouter = require('./routes/pages_routes');

const app = express();
const port = 8085;

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})

app.set('view engine', 'ejs');  //for ejs

// == middlewares ============================================

app.use(express.static('public')); // for css

app.use(express.urlencoded({ extended: true }))  //for req.body{}

app.use(reqBodyMethodOverride);  // for PUT and DELETE in forms

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}))

app.use(setCurrentUser); // set current user

app.use(requestLogger);  // request Logger

app.use(expressLayouts);  // for Layouts


// == routers ================================================

app.use(pageRouter);

app.use('/destinations', ensureLoggedIn, destinationRouter);

app.use(sessionRouter);

app.use(usersRouter);

