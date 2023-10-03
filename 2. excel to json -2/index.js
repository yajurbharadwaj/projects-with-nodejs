const express = require("express");
const multer = require("multer");
const excelToJson = require("convert-excel-to-json");
const fs = require("fs-extra");

//Create an instance of the Express application and set the port to 3000:
const app = express();
const port = 3000;

//Configure Multer to handle file uploads and store uploaded files in the "uploads/" directory
var upload = multer({ dest: "uploads/" })


//Define a POST route at "/read" that handles file uploads. This route expects a file with the field name "file" to be sent in a POST request.
//When a file is uploaded to this endpoint, the code inside the callback function is executed.
app.post("/read", upload.single("file"), (req, res) => {
    try {
        var file = req.file?.filename;
        if (file == null || file == "undefined") {  //check if the file path exists
            res.status(400).json("No File");
        } else {
            var filePath = "uploads/" + file;  //constuct the file path

            //convert excel to json file using excelToJson method
            const excelData = excelToJson({
                sourceFile: filePath,
                header: {
                    rows: 1,
                }, columnTokey: {
                    "*": "{{columnHeader}}",
                },
            });
            fs.remove(filePath);
            res.status(200).json(excelData);
        }
    } catch (error) {
        res.status(500);
    }
});

//Start the Express server, and it listens on port 3000. When the server starts, it logs a message to the console.
app.listen(port, () => {
    console.log(`node.js app is listerning on the PORT ${port}`);
});