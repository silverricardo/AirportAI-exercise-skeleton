let express = require('express');
let router = express.Router();
let Users = require('../controllers/users');
let ErrorHandler = require('../controllers/errorHandler');

router.post('/api/authenticate', async (req, res) =>{
    try {

        let response = await Users.authenticateUser(req);
        return res.status(200).send(response);

    } catch (error) {
        ErrorHandler.ErrorHandler(error, res)
    }
    }
);


module.exports = router;
