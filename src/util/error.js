module.exports = function(code = 404, message = ""){
    return {
        "error code": code,
        message: message,
        date: new Date().toISOString()
    }
}