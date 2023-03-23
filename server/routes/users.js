let express = require('express');
let router = express.Router();

router.get('/api/private/', function(req, res) { return res.send('Hello world!'); });

module.exports = router;
