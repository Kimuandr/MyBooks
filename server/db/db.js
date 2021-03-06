const Sequelize = require("sequelize");
const config = require("../config_data/config");

const db = new Sequelize(config.database, config.username, config.password, {
	host: config.host,
	dialect: config.dialect,
	define: {
		freeTableName: true
	}
});

module.exports = db;
