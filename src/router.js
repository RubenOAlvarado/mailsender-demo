const express = require('express');
const router = express.Router();
const controller = require('./controller');

router.get('/', (req, res) => res.send('Hello World'));

router.post('/testMail', controller.sendMail);

module.exports = router;