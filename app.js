const express = require('express');
const app = express();
const port = 3000;
const {requireLogin} = require('./middleware');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('./database');
const session = require('express-session');

const server = app.listen(port,() => console.log('Server listening on port',port));


app.set('view engine', 'pug');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false}));
app.use(express.static(path.join(__dirname, "public")));

app.use(session({
    secret: "donuts", // Move the secret into a env variable
    resave: true,
    saveUninitialized: false // prevent save the session as unitialized
}));

// Routes
const loginRoute = require('./routes/loginRoutes');
const registerRoute = require('./routes/registerRoutes');

app.use("/login", loginRoute);
app.use("/register", registerRoute);

app.get('/', requireLogin, (req ,res ,next) => {

    var payload = {
        pageTitle: "Home"
    };

    res.status(200).render("home", payload);
});