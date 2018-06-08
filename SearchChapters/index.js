var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;
var db = require('../lib/dbutil.js')
var config = db.config;
var http = require('../lib/httputil.js');
var Connection = require('tedious').Connection;

module.exports = function (context, req) {
    var keywords = http.getParam(req, 'k');

    if (keywords) {
        var Connection = require('tedious').Connection;

        var connection = new Connection(config);
        connection.on('connect', (err) => {
            
            if(err) {
                return http.error(context, http.codes.InternalServerError, err, "Error connecting to the database.");
            }

            SearchChapters(keywords, connection, context, (err, data) => {

                if(err) {
                    return http.error(context, http.codes.InternalServerError, err, "Error querying the database.");
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
 * @param {*} keywords 
 * @param {*} connection 
 * @param {*} context 
 * @param {*} callback 
 */
function SearchChapters(keywords, connection, context, callback) {
    var data = { chapters: [] };
    var mappings = { 
        'Code': 'code',
         'Chapter': "description"
    }

    var request = new Request('EXEC [dbo].[SEARCH_CHAPTERS] @KEYWORDS', (err) => {
        if(err) {
            context.log(err);
            return callback(err);
        } else {
            callback(null, data);
        }
    });

    request.addParameter('KEYWORDS', TYPES.VarChar, keywords);
    request.on('row', (columns) => {
        var chapter =  { }
        db.mapColumns(chapter, columns, mappings);

        data.chapters.push(chapter);
    });

    connection.execSql(request);
}