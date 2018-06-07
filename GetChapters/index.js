var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;
var config = require('../lib/config.js');

module.exports = function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    var Connection = require('tedious').Connection;
    

    var connection = new Connection(config);
    connection.on('connect', (err) => {
        context.log('Connected to database!');
        GetChapters(connection, (err, data) => {
            
            context.log('Done!');
            
            context.res = {
                contentType: 'text/json',
                body: JSON.stringify(data) //'Hi!' //JSON.stringify(chapters)
            }
        
            context.done();
            
        });       
    });

};

function GetChapters(connection, callback) {
    var data = { chapters: [] };

    var request = new Request('EXEC [dbo].[GET_CHAPTERS]', (err) => {
        if(err) {
            context.log(err);
            return callback(err);
        } else {
            callback(null, data);
        }
    });

    request.on('row', (columns) => {
        var chapter =  { }
        columns.forEach((column => {
            chapter[column.metadata.colName] = column.value;
        }))
        data.chapters.push(chapter);
    });

    connection.execSql(request);
}

function map(columns) {
    var chapter =  { code: '', chapter: ''}
    columns.forEach(column => {
        
    });
}