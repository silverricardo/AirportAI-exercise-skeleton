module.exports = {
    ErrorHandler: (error, res) => {
        if (error.auth === false)
            return res.status(400).send(error);
        else
            if (error.response)
                return res.status(400).send(error.response.data);
            else
                return res.status(500).send(error.message);
    }
};