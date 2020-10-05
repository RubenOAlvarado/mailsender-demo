const transporter = require('./sender');

exports.sendMail = (req, res) => {
    const {from, to, subject, text} = req.body;

    const mailOptions = {from,to,subject,text};
    transporter.sendMail(mailOptions, (err, info) => {
        if(err) console.log(err);
        else return res.status(200).json({message:`Mail sended to ${to}`});
    });
}