var mysql = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'WebServer-8836',
    database : 'web'
});

module.exports = connection;