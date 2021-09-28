const config = require("../config_data/config");
const jwt = require("jsonwebtoken");
// const ServerError = require("../errors/serverErrors");

module.exports = function(role) {
    return function(req, res, next) {
        if (req.method === "OPTIONS") {
            next();
        }
      try {
		const authHeader = req.headers.authorization.split(" ")[1];

		if (!authHeader) {
			res.status(401).json({ message: "Non authorized" });
		}

		const data = jwt.verify(authHeader, config.jwt);
        if (data.role !== role) {
            res.status(403).json({ message: "No possibility to enter" });
        }
		req.newUser = data;
		next();
	} catch (err) {
		res.status(401).json({ message: "Non authorized" });
	}  
    }
	
};

