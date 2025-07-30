const sendErrorResponse = (res, statusCode, message, errors = []) => {
    const response = {
        status: statusCode,
        message: message,
    };

    if (errors.length > 0) {
        response.errors = errors;
    }

    res.status(statusCode).json(response);
};

module.exports = { sendErrorResponse };