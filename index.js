//App creation
const express = require("express");
const app = express();

//find PORT
require("dotenv").config();
const PORT = process.env.PORT || 3000;

//add middlewares
app.use(express.json());
const fileupload = require("express-fileupload");
app.use(fileupload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));

//connect with db
const db = require("./config/database");
db.connect();

//connect with cloud
const cloudinary = require("./config/cloudinary");
cloudinary.cloudinaryConnect();

//api route mount
const upload = require("./routes/FileUpload");
app.use("/api/v1/upload", upload);

//activate server
app.listen(PORT, () => {
    console.log(`App is running at ${PORT}`);
})