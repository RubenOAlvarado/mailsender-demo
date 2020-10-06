const Mailing = require('./sender');

exports.sendMail = (req, res) => {
    const {email, template} = req.body;
    const data = {email, template};
    try {
        Mailing.sendMail(data);
        res.status(200).json({message: `Mail sucessfully sended to ${email}`});
    } catch (e) {
        res.status(500).json({error: e});
    }
}