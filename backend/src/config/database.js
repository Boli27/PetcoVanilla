const mysql2 = require('mysql2');

//conexion db
const database = mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database:'petco',
});

module.exports=database;