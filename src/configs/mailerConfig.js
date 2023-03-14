const { google } = require('googleapis')
const nodemailer = require('nodemailer')

const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET
const REDIRECT_URI = process.env.REDIRECT_URI
const REFRESH_TOKEN = process.env.MAIL_REFRESH_TOKEN

const oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)
oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN })

var that = module.exports = {
    sendMail: async (toEmail, otp) => {
        try {
            const accessToken = await oauth2Client.getAccessToken()
            const transport = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    type: 'OAuth2',
                    user: 'cuahanggiaydepstorage@gmail.com',
                    clientId: CLIENT_ID,
                    clientSecret: CLIENT_SECRET,
                    refreshToken: REFRESH_TOKEN,
                    accessToken: accessToken

                }
            })
            let info = await transport.sendMail({
                from: '"Banana Shop" <cuahanggiaydepstorage@gmail.com>', // sender address
                to: `${toEmail}`, // list of receivers
                subject: 'Sign up for Banana Shop',
                text: `Your OTP is: ${otp}`, // plain text body
                html: `<b>Your OTP is: </b> ${otp}`, // html body
            });

        } catch (error) {
            console.log(error);
        }
    }
}
