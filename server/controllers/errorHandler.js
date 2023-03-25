module.exports = {
    ErrorHandler: (error, res) => {
        if (error.status)
            return res.status(error.status).send(error.message);
        else
            if (error.response)
                return res.status(400).send(error.response.data);
            else
                return res.status(500).send(error.message);
    }
};