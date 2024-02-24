const mongoose = require("mongoose");
require("dotenv").config();

exports.connect = async () => {
    mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then( () => console.log("DB Connection Successful"))
    .catch( (error) => {
        console.log("DB Connection Failed");
        console.log(error.message);
        process.exit(1);
    })
}