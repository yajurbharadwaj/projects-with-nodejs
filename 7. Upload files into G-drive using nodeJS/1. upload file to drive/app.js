const { google } = require("googleapis");
const path = require("path");
const fs = require('fs');


const CLIENT_ID = ' ';
const CLIENT_SECRET = ' ';
const REDIRECT_URI = ' ';

const REFRESH_TOKEN = ' ';

const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
);

oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const drive = google.drive({
    version: 'v3',
    auth: oauth2Client
})

const filePath = path.join(__dirname, 'brain.jpg')

async function uploadFile() {
    try {

        const response = await drive.files.create({
            requestBody: {
                name: 'brain.jpg',
                mimeType: 'image/jpg'
            },
            media: {
                mimeType: 'image/jpg',
                body: fs.createReadStream(filePath)
            }
        })

        console.log(response.data);

    } catch (error) {
        console.log(error.message)
    }

}

uploadFile();

