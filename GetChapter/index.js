var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;
var db = require('../lib/dbutil.js')
var config = db.config;
var http = require('../lib/httputil.js');
var Connection = require('tedious').Connection;

module.exports = function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    var code = http.getParam(req, 'c');

    if (code) {
        var Connection = require('tedious').Connection;

        var connection = new Connection(config);
        connection.on('connect', (err) => {
            
            GetChapter(code, connection, context, (err, data) => {

                if(err) {
                    return http.error(context, http.codes.InternalServerError, err, "Error querying the database.");
                } else {
                    return http.json(context, data);
                }

            });
        });

    }
    else {
       http.error(context, http.codes.BadRequest, null, "Please pass a chapter code in the query string or in the request body (c=chapter).");
    }
};

/**
 * 
 * @param {*} code 
 * @param {*} connection 
 * @param {*} context 
 * @param {*} callback 
 */
function GetChapter(code, connection, context, callback) {
    var data = { chapters: [] };
    var mappings = { 
        'Code': 'code',
         'Chapter': "description"
    }

    var request = new Request('EXEC [dbo].[GET_CHAPTER] @CODE', (err) => {
        if(err) {
            context.log(err);
            return callback(err);
        } else {
            callback(null, data);
        }
    });

    request.addParameter('CODE', TYPES.VarChar, code);
    request.on('row', (columns) => {
        var chapter =  { }
        db.mapColumns(chapter, columns, mappings);
        data.chapters.push(chapter);
    });

    connection.execSql(request);
}