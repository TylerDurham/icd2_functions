var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;
var db = require('../lib/dbutil.js')
var config = db.config;
var http = require('../lib/httputil.js');
var Connection = require('tedious').Connection;

module.exports = function (context, req) {
    var keywords = http.getParam(req, 'k');

    if (keywords) {
        
        context.log(`[[ input keywords: ${keywords}`);
        var query = parseKeywords(keywords);
        context.log(`[[ parsed query ${query}`);

        var connection = new Connection(config);
        connection.on('connect', (err) => {
            
            if(err) {
                return http.error(context, http.codes.InternalServerError, err, db.errors.DB_CN_ERROR);
            }

            SearchCodes(query, connection, context, (err, data) => {
                if(err) {
                    return http.error(context, http.codes.InternalServerError, err, db.errors.DB_CMD_ERROR);
                } else {
                    return http.json(context, data);
                }
            });
        });
    }
    else {
        http.error(context, 400, null, "Please pass a search keyword on the query string or in the request body (k=searchterm).");
    }
};

/**
 * 
 * @param {*} keyword 
 * 
 */
function parseKeywords(keyword) {
    var regex = /("(.*)")|[^\W\d]+[\u00C0-\u017Fa-zA-Z'](\w|[-'](?=\w))*("(.*)")|[^\W\d]+[\u00C0-\u017Fa-zA-Z'](\w|[-'](?=\w))*/gi;
    var tokens = keyword.match(regex);
    return tokens.join (' AND ');
}

function SearchCodes(keywords, connection, context, callback) {
    var data = { codes: [] };
    var mappings = { 
        'ICD10': 'code',
         'Short_Description': "description",
         "ChapterCodeKey": 'chapter',
         'HIPAA_valid': 'hippa'
    }
    
    var request = new Request('EXEC [dbo].[SEARCH_CODES] @KEYWORDS', (err) => {
        if(err) {
                return callback(err);
        } else {
            callback(null, data);
        }
    });

    request.addParameter('KEYWORDS', TYPES.VarChar, keywords);
    request.on('row', (columns) => {
        var code =  { }
        db.mapColumns(code, columns, mappings);

        data.codes.push(code);
    });

    connection.execSql(request);
}
