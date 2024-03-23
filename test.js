const mysql = require('mysql');

const sql = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'test',
    database:'testusersdb'
})

sql.query("SELECT UserName FROM users",(err,data)=>{
    if (!err) {
        console.log("All users:", data[0].UserName);
    } else {
        console.error(err);
    }
});