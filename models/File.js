const mongoose = require("mongoose");
const {transporter} = require("../config/transporterModule");
require("dotenv").config();

const fileSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    imageUrl: {
        type: String,
        required: true
    },
    tags: {
        type: String
    },
    email: {
        type: String
    }
});

//post middleware
fileSchema.post("save", async function(doc){
    try{
        //send mail
        let info = await transporter.sendMail({
            from: 'Sargun',
            to: doc.email,
            subject: "New File uploaded on cloudinary",
            html: `<h2>Hello ${doc.name} Ji</h2> <p>your file has been uploaded successfully</p> <img src= "${doc.imageUrl}"/>`
        })

        console.log("INFO => ", info);
    }
    catch(error){
        console.log(error);
    }
})

module.exports = mongoose.model("File", fileSchema);