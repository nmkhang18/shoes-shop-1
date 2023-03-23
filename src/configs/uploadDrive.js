const { google } = require('googleapis')
const fs = require('fs')
const stream = require("stream");
const path = require('path')
const { file } = require('googleapis/build/src/apis/file')
require('dotenv').config()

const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET
const REDIRECT_URI = process.env.REDIRECT_URI
const REFRESH_TOKEN = process.env.REFRESH_TOKEN

const oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)
oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN })

const drive = google.drive({
    version: 'v3',
    auth: oauth2Client
})


var that = module.exports = {
    setPublic: async (fileId) => {
        try {
            await drive.permissions.create({
                fileId,
                requestBody: {
                    role: 'reader',
                    type: 'anyone'
                }
            })

        } catch (error) {

        }
    },
    upload: async (res, fileIn, name) => {
        try {
            const bufferStream = new stream.PassThrough();
            bufferStream.end(fileIn);
            const createFile = await drive.files.create({
                requestBody: {
                    name: `${name}.jpg`,
                    mimeType: "image/jpg"
                },
                media: {
                    mimeType: 'image/jpg',
                    body: bufferStream
                }
            })
            const fileId = createFile.data.id
            await that.setPublic(fileId)
            console.log(createFile.data);
            return fileId
        } catch (error) {
            // console.log(error.response.data.error);
            return res.json({
                status: 400,
                message: error.response.data.error
            })
        }
    },

    delete1: async (id) => {
        try {
            const deleteFile = await drive.files.delete({
                fileId: id
            })
        } catch (error) {
            return res.json({
                status: 400,
                message: error.response.data.error
            })
        }
    }

}