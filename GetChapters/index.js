var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;

module.exports = function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    var Connection = require('tedious').Connection;
    var config = {
        userName: 'Greg',
        password: 'DemaPs1242!1@',
        server: 'qualitywritebacks.database.windows.net',
        options: { encrypt:true, database: 'QualityWritebacks' }
    }

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

    var request = new Request('SELECT Code, Chapter from ICD10Chapters', (err) => {
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