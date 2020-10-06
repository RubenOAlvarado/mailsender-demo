const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');
require('dotenv').config();

const { google } = require('googleapis');
const { OAuth2 } = google.auth;


const OAUTH_PLAYGROUND = 'https://developers.google.com/oauthplayground';

const {
    MAIL_USER,
    CLIENT_ID,
    SECRET,
    REFRESH_TOKEN
} = process.env;

const Mailing = {};

const oauth2Client = new OAuth2(CLIENT_ID, SECRET, OAUTH_PLAYGROUND);

const TEMPLATES = {
    subscribe: {
        filename: 'subscribe.ejs',
        subject: 'Gracias por su compra'
    }
}


Mailing.sendMail = data => {

    oauth2Client.setCredentials({
        refresh_token: REFRESH_TOKEN
    });

    const accessToken = oauth2Client.getAccessToken();

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth:{
            type: 'OAuth2',
            user: MAIL_USER,
            clientId: CLIENT_ID,
            clientSecret: SECRET,
            refreshToken: REFRESH_TOKEN,
            accessToken: accessToken,
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    const filePath = path.join(__dirname, '../template', TEMPLATES[data.template].filename);

    ejs.renderFile(filePath, data, {}, (e, content) => {
        if(e) console.log(e);

        const mailOptions = {
            from: MAIL_USER,
            to: data.email,
            subject: TEMPLATES[data.template].subject,
            html: content
        }
    
        transporter.sendMail(mailOptions, (err, info) => {
            if(err) console.log(err);
            return info;
        });
    });
}

module.exports = Mailing;