const mysql = require('mysql');

//DataBase Connection
const sql = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'test',
    database:'testusersdb'
});


// Attempt to connect to the database
sql.connect(err => {
    if(err){console.error(err)}else{
        console.log("Server was connected to database!");
    }
});

//Add item to the user
function addToDataBase(username,userpassword){
    const query = "INSERT INTO `users` (`UserName`, `UserPassword`) VALUES ('testuser', 'testpass');"
    const inserted = query.split("'");
    inserted[1] = username;
    inserted[3] = userpassword;
    const joined = inserted.join("'");

    return joined;
}

sql.query(addToDataBase('izanamii','0987654321'),(err)=>{
    if(!err){console.log("Element successfully Added")}
    else{console.error(err)}
})