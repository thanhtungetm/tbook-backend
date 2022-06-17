const mysql = require('mysql');

const host = process.env.DB_HOST || 'localhost';
const user = process.env.DB_USER || 'root';
const password = process.env.DB_PASS || '';
const database = process.env.DB_DATABASE || 'tbook';

const con = mysql.createConnection({
    host, user, password, database,
});


exports.connectDB = () => {
    con.connect(function (err) {

        if (err) throw err;

        console.log("Connected DB")
    });
}
exports.con = con

