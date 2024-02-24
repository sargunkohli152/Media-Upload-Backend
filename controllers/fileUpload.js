const File = require("../models/File");
const cloudinary = require("cloudinary").v2;

//localFileUpload => handler functon
exports.localFileUpload = async (req, res) => {
    try{
        //fetch file
        const {file} = req.files;

        let path = __dirname + "/files/" + Date.now() + `.${file.name.split('.')[1]}`;

        file.mv(path, (err) => {
            console.log(err);
        });

        res.json({
            success: true,
            message: "Local file uploaded successfully"
        })
    }
    catch(error){
        console.log(error);
        res.json({
            success: false,
            message: "File upload failed"
        })
    }
}

function isFileTypeSupported(type, supportedTypes){
    return supportedTypes.includes(type);
}

async function uploadFileToCloudinary(file, folder, quality){
    const options = {folder};
    options.resource_type = "auto";

    if(quality){
        options.quality = quality;
    }

    return await cloudinary.uploader.upload(file.tempFilePath, options);
}

//imageUpload handler
exports.imageUpload = async(req, res) => {
    try{
        const {name, tags, email} = req.body;

        const file = req.files.imageFile;

        //validation
        const supportedTypes = ["jpg", "jpeg", "png"];
        const fileObj = file.name.split('.');
        const fileType = fileObj[fileObj.length - 1].toLowerCase();
        if(!isFileTypeSupported(fileType, supportedTypes)){
            return res.status(400).json({
                success: false,
                message: "File format not supported"
            })
        }

        //file format is supported
        const response = await uploadFileToCloudinary(file, "Codehelp"); 
        const imageUrl = response.secure_url;

        //save entry in database
        const fileData = await File.create({
            name, imageUrl, tags, email
        })

        res.json({
            success: true,
            imageUrl: imageUrl,
            message: "Image successfully uploaded"
        })
    }
    catch(error){
        console.log(error);
        res.status(200).json({
            success: false,
            message: "Something went wrong."
        })
    }
}

//video upload
exports.videoUpload = async (req, res) => {
    try{
        const file = req.files.videoFile;
        const { name, tags, email } = req.body;

        //validation
        const supportedTypes = ["mp4", "mov"];
        const fileObj = file.name.split(".");
        const fileType = fileObj[fileObj.length -1].toLowerCase();

        //add less than 5MB condition
        if (!isFileTypeSupported(fileType, supportedTypes)) {
            return res.json({
                success: false,
                message: "File fromat or file size not supported"
            })
        }

        //file type is supported
        const response = await uploadFileToCloudinary(file, "Codehelp")

        //entry in database
        const fileData = await File.create({
            name,  
            imageUrl: response.secure_url,  
            tags, 
            email
        })

        res.json({
            success: true,
            videoUrl: response.secure_url,
            message: "Video successfully uploaded"
        })
    }
    catch(error){
        console.log(error);
        res.status(200).json({
            success: false,
            message: "Something went wrong"
        })
    }
}

//imageSizeReducer handler
exports.imageSizeReducer = async (req, res) => {
    try{
        const {name, tags, email} = req.body;

        const file = req.files.imageFile;

        //validation
        const supportedTypes = ["jpg", "jpeg", "png"];
        const fileObj = file.name.split('.');
        const fileType = fileObj[fileObj.length - 1].toLowerCase();
        if(!isFileTypeSupported(fileType, supportedTypes)){
            return res.status(400).json({
                success: false,
                message: "File format not supported"
            })
        }

        //file format is supported
        const response = await uploadFileToCloudinary(file, "Codehelp", 90); 
        const imageUrl = response.secure_url;

        //save entry in database
        const fileData = await File.create({
            name, imageUrl, tags, email
        })

        res.json({
            success: true,
            imageUrl: imageUrl,
            message: "Image successfully uploaded"
        })
    }
    catch(error){
        console.log(error);
        res.status(200).json({
            success: false,
            message: "Something went wrong"
        })
    }
}