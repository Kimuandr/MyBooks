class ServerError extends Error {
	constructor(status, message) {
		super();
		this.message = message;
		this.status = status;
	}

	static BAD_REQUEST(message) {
		return new ServerError(400, message);
	}

	static FORBIDDEN(message) {
		return new ServerError(403, message);
	}

	static NOT_FOUND(message) {
		return new ServerError(404, message);
	}

	static INTERNAL_SERVER(message) {
		return new ServerError(500, message);
	}
}

module.exports = ServerError;
