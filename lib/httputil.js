var http = {
    error: error,
    getParam: getParam,
    json: json,
    codes:  {

        // Success
        OK:                     200,
        Created:                201,
        Accpted:                202,
        NoContent:              204,

        // 400 Client Errors
        BadRequest:             400,
        Unauthorized:           401,

        // 500 Server Errors
        InternalServerError:    500
    }
}

function getParam(req, key, defaultValue) {
    if(!defaultValue) { defaultValue = null; }
    if(req.query[key] || (req.body && req.body[key])) {
        return (req.query[key] || req.body[key]).trim();
    }

    return defaultValue;
}

function error(context, code, err, message) {
    context.log(message);
    context.log(err);
    context.res = {
        status: code,
        body: message
    };
    
    context.done();
}

function json(context, data) {
    context.res = {
        contentType: 'text/json',
        body: JSON.stringify(data) 
    }

    context.done();
}

module.exports = http;