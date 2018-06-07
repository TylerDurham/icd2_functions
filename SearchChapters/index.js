var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;
var config = require('../lib/config.js');

module.exports = function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    var keyword = (req.query.keyword || (req.body && req.body.keyword));

    if (keyword) {
        var Connection = require('tedious').Connection;

        var connection = new Connection(config);
        connection.on('connect', (err) => {
            context.log('Connected to database!');
            SearchChapters(keyword, connection, context, (err, data) => {

                context.log('Done!');

                context.res = {
                    contentType: 'text/json',
                    body: JSON.stringify(data) 
                }

                context.done();

            });
        });

    }
    else {
        context.res = {
            status: 400,
            body: "Please pass a search keyword on the query string or in the request body."
        };
    }
};

function SearchChapters(keywords, connection, context, callback) {
    var data = { chapters: [] };

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
        columns.forEach((column => {
            chapter[column.metadata.colName] = column.value;
        }))
        data.chapters.push(chapter);
    });

    connection.execSql(request);
}