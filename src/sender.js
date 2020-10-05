const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth:{
        type: 'OAuth2',
        user: process.env.MAIL_USER,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken: process.env.ACCES_TOKEN,
    }
});

module.exports = transporter;