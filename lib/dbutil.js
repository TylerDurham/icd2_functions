var db = {
    config: {
        userName: 'Greg',
        password: 'DemaPs1242!1@',
        server: 'qualitywritebacks.database.windows.net',
        options: { encrypt:true, database: 'QualityWritebacks' }
    },
    errors: {
        DB_CMD_ERROR: 'Error querying the database.',
        DB_CN_ERROR: 'Error connecting to the database.'
    },
    mapColumns: mapColumns
}

/**
 * 
 * @param {*} obj 
 * @param {*} columns 
 * @param {*} mappings 
 */
function mapColumns(obj, columns, mappings) {
    columns.forEach((column => {
        var mapping = mappings[column.metadata.colName];
        if(mapping) {
            obj[mapping] = (column.value) ? column.value.trim() : column.value;
        }
    }));
}

module.exports = db;


