const express = require('express');
const app = express();
const router = express.Router();
const User = require('../schemas/UserSchema');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');


app.use(bodyParser.urlencoded({ extended: false}));


router.get('/', (req ,res ,next) => {
    if(req.session) {
        req.session.destroy(() => {
            res.redirect("/login");
        });
    }
});

module.exports = router;