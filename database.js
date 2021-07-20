const mongoose = require('mongoose');

//Fix deprecated errors
mongoose.set('useNewUrlParser', true); 
mongoose.set('useFindAndModify', false); //  use supported version without warnings



class Database {

    constructor() {
        this.connect();
    }

    connect(){
        mongoose.connect("mongodb+srv://admin:ola123456@twitterclonecluster.zwwhu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
        .then(() => {
            console.log("Connected successfully to the database");
        })
        .catch((err) => {
        console.log("Error while connecting to the database", err)
        }
        );
    }
}

module.exports = new Database();