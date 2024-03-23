const express = require('express');
const path = require('path');
const crpyto = require('crypto');
const cors = require('cors');
const fs = require('fs');
const mysql = require('mysql');
require('dotenv').config();


const app = express();
const PORT = 3000;
const publicPath = path.join(__dirname,'public');

//DataBase Connection
const sql = mysql.createConnection({
    host:process.env.DB_HOST || 'localhost',
    user:process.env.DB_USER || 'root',
    password:process.env.DB_PASSWORD || 'test',
    database:process.env.DB_NAME || 'testusersdb'
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

//Delete an Item from Database
function deleteFromDataBase(username,password) {
    const query = `DELETE FROM users WHERE UserName = '${username}' AND UserPAssword = '${password}';`;

    return query;
}



app.use(express.static(publicPath));




//middleware
app.use(express.json());
app.use(cors({
    origin: "*"
}));


//Test URI
app.get('/testAdd',(req,res)=>{
    sql.query(addToDataBase('izanamii','0987654321'),(err)=>{
        if(!err){res.send("Element successfully Added")}
        else{console.error(err)}
    });
})

app.get('/testDelete',(req,res)=>{
    sql.query(deleteFromDataBase('izanamii','0987654321'), (err) => {
        if(!err){res.send("Element successfully deleted");
        }else{console.error(err)}
    });
})

//Root Files
app.get('/',(req,res)=>{
    //Entry Point
    res.sendFile(path.join(publicPath,'page.signin.html'));
});

//Server Op

//Prototpye Method Unused
function login(data, callback) {
    function toHash(inc) {
        const hash = crpyto.createHash('sha256');
        hash.update(inc);
        return hash.digest('hex');
    }
    console.log(data.name,data.password)

    fs.readFile(path.join(publicPath, 'data.json'), 'utf-8', (err, fileData) => {
        if (err) {
            console.error('Error reading file:', err);
            return false;
        }
        const object = JSON.parse(fileData);

        const isLogged = object.some(userData => {
            return userData.name === toHash(data.name) && userData.password === toHash(data.password);
        });

        if (isLogged) {
            callback('Login Sucessfull');
        } else {
            callback('Login failed')
        }
    });
}

function logins(data,callback){
    function toHash(inc) {
        const hash = crpyto.createHash('sha256');
        hash.update(inc);
        return hash.digest('hex');
    }

    sql.query("SELECT * FROM usersdb", (err, users) => {
        if (err) {
            console.error(err);
            return callback("Error on Cheking The Data");
        }

        const DATA = users.map(data => {return {name:data.UserName,pass:data.UserPassword}});
        const isLogged = DATA.some(userData => {
            return userData.name === toHash(data.name) && userData.pass === toHash(data.password);
        });

        if (isLogged) {
            callback('Login Sucessfull');
        } else {
            callback('Login failed')
        }
    });
}


app.post('/LogIn',(req,res)=>{
    const data = req.body.data;
    logins(data, (respond) => {
        res.send(respond);
    });
});


//Prototype Method Unused..
function signUp(data, callback) {
    function toHash(inc) {
        const hash = crpyto.createHash('sha256');
        hash.update(inc);
        return hash.digest('hex');
    }
    /*
    fs.readFile(path.join(publicPath, 'data.json'), 'utf-8', (err, fileData) => {
        if (err) {
            console.error('Error reading file:', err);
            return false;
        }
        const object = JSON.parse(fileData);
        const isExistingUser = object.some(userData => {
            return userData.name === toHash(data.name);
        });

        if (isExistingUser) {
            callback('Username already exists. Please choose a different one.')
        } else {
            object.push({
                name: toHash(data.name),
                password: toHash(data.password),
            });
            fs.writeFile(path.join(publicPath, 'data.json'), JSON.stringify(object, null, 2), 'utf-8', (writeErr) => {
                if (writeErr) {
                    console.error('Error writing file:', writeErr);
                } else {
                    callback('Account Succsessfully Created!');
                }
            });
        }
    });
    */
    //To Data Base..
    sql.query("SELECT UserName FROM usersdb",(err,users)=>{
        if (!err) {
            const names = users.map(user => user.UserName);
            console.log(names);
            console.log(users);
            console.log(toHash(data.name))
            console.log(names.includes(toHash(data.name)))

            isUserExist =  names.includes(toHash(data.name));

            if(isUserExist){callback('Username already exists. Please choose a different one.')}else{
                sql.query(addToDataBase(toHash(data.name),toHash(data.password)),(err)=>{
                    if(!err){callback("Account successfully Added")}
                    else{console.error(err)}
                });
            }
        }else{console.error(err)}
    });
}


//SignUP Method
function signUps(data, callback) {
    function addToDataBase(username, userpassword) {
        return `INSERT INTO usersdb (UserName, UserPassword) VALUES ('${toHash(username)}', '${toHash(userpassword)}')`;
    }

    function toHash(input) {
        const hash = crpyto.createHash('sha256');
        hash.update(input);
        return hash.digest('hex');
    }

    // Check if username already exists
    sql.query("SELECT UserName FROM usersdb", (err, users) => {
        if (err) {
            console.error(err);
            return callback("Error checking existing usernames");
        }

        const hashedUsername = toHash(data.name);
        const existingUsernames = users.map(user => user.UserName);
        
        if (existingUsernames.includes(hashedUsername)) {
            return callback('Username already exists. Please choose a different one.');
        }

        // If username doesn't exist, proceed with adding to the database
        const hashedPassword = toHash(data.password);
        const query = addToDataBase(data.name, data.password);

        console.log(hashedPassword)

        sql.query(query, (err) => {
            if (err) {
                console.error(err);
                return callback("Error adding user to the database");
            }
            callback("Account successfully added");
        });
    });
}


app.post('/SignIn',(req,res)=>{
    const data = req.body.data;
    signUps(data, (respond) => {
        res.send(respond);
    });
});


app.listen(PORT,()=>{
    console.log(`http://localhost:${PORT}`)
});