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

const filePath = path.join(__dirname, 'nezuko.png')

async function uploadFile() {
    try {

        const response = await drive.files.create({
            requestBody: {
                name: 'nezuko.png',
                mimeType: 'image/png'
            },
            media: {
                mimeType: 'image/png',
                body: fs.createReadStream(filePath)
            }
        })

        console.log(response.data);

    } catch (error) {
        console.log(error.message)
    }

}

//uploadFile();


async function deleteFile() {
    try {
        const response = await drive.files.delete({
            fileId: ' '
        })
        console.log(response.data, response.status)
    } catch (error) {
        console.log(error.message)
    }
}

//deleteFile();

async function generatePublicURL() {
    try {
        const fileId = ' '
        await drive.permissions.create({
            fileId: fileId,
            requestBody: {
                role: 'reader',
                type: 'anyone'
            }
        })
        const result = await drive.files.get({
            fileId: fileId,
            fields: ' '
        });
        console.log(result.data)
    } catch (error) {
        console.log(error.message)
    }
}

generatePublicURL();