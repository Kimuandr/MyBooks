const ServerError = require("../errors/serverErrors");

const serverErrorHandler = (err, req, res, next) => {
    if (err instanceof ServerError) {
        return res.status(err.status).json({ message: "err.message" });
    }
    res.status(500).json({ message: "Something went wrong..." });
};

module.exports = serverErrorHandler;
