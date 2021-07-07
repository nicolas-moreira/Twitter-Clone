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
            console.log("Connexion à la base de données réussie");
        })
        .catch((err) => {
        console.log("La connexion à la base de données a échoué", err)
        }
        );
    }
}

module.exports = new Database();