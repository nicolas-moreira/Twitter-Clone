const express = require('express');
const app = express();
const router = express.Router();
const User = require('../schemas/UserSchema');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

app.set('view engine', 'pug');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false}));


router.get('/', (req ,res ,next) => {
    res.status(200).render("login");
});

router.post('/', async (req ,res ,next) => {
    
    var payload = req.body;

    if(req.body.logUsername && req.body.logPassword){
        var user = await User.findOne({
            $or: [
                { username: payload.logUsername },
                { email: payload.logUsername }
            ]
        })
        .catch((error) => {
            console.log(error);
            payload.errorMessage = "Something went wrong.";
            res.status(200).render("login", payload);
        });

        if(user != null){
            var result = await bcrypt.compare(req.body.logPassword,user.password);

            if(result === true){
                req.session.user = user;
                return res.redirect("/");
            }
            else {
                //We are not telling the user that the password is incorrect for security reasons.
                payload.errorMessage = "Password or username incorrect."
                return res.status(200).render("login", payload);
            }
        }

        //If there's no user with that email or name
        payload.errorMessage = "Password or username incorrect."
        return res.status(200).render("login", payload);
    }
    payload.errorMessage = "Make sure each field has a valid value";
    res.status(200).render("login", payload);
});


module.exports = router;