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
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME
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
function login(data, callback) {
    function toHash(inc) {
        const hash = crpyto.createHash('sha256');
        hash.update(inc);
        return hash.digest('hex');
    }

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


app.post('/LogIn',(req,res)=>{
    const data = req.body.message;
    login(data, (respond) => {
        res.send(respond);
    });
});

function signUp(data, callback) {
    function toHash(inc) {
        const hash = crpyto.createHash('sha256');
        hash.update(inc);
        return hash.digest('hex');
    }

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
                    callback('User successfully registered');
                }
            });
        }
    });
}

app.post('/SignIn',(req,res)=>{
    const data = req.body.message;
    signUp(data, (respond) => {
        res.send(respond);
    });
});


app.listen(PORT,()=>{
    console.log(`http://localhost:${PORT}`)
});