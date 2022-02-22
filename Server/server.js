const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql2')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 3001

const connection = mysql.createConnection({
host: "",
user: "",
password: "",
database: "",
port: 3306
})

try
{
    console.log("Connected!")
    var sql = "SHOW TABLES LIKE 'housedetails'";
    connection.query(sql, function (err, result) {
        if(result.length === 0)
        {
            var sql = "CREATE TABLE housedetails (houseId VARCHAR(255), houseNo VARCHAR(255),  status VARCHAR(255),  type VARCHAR(255),  PRIMARY KEY (houseId))";
            connection.query(sql, function (err, result) {
                if (err) throw err;
                console.log("Table created!");
            });
        }
        else{
            console.log("Table already exists!")
        }
    });
}

catch(e)
{
    console.log(e)
}

app.use(cors(
    {
        origin: "*",
    }
))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}) )

app.listen(port,()=>{
    console.log("server is running")
})

function showDetails(req,res)
{
    var sql = "SELECT * from housedetails"
    connection.query(sql, function (err, result) {
        if (err)
        {
            res.json({response: "DB error"})
        }
        else
        {
           res.json(result)
        }
    });
}

app.get('/',(req,res)=>{
    res.send("Welcome to house management")
})

app.get('/start',(req,res)=>{
    showDetails(req,res)
})

app.post('/saveHouse',(req,res)=>{
    var sql = "INSERT INTO housedetails (houseId, houseNo, status, type) VALUES ("+"'"+ req.body.houseId+"'" +", "+"'"+req.body.houseNo+"'"+", "+"'"+req.body.status+"'"+", "+"'"+req.body.type+"'"+")"
    connection.query(sql, function (err, result) {
        if (err)
        {
            res.json({response: "DB error"})
        }
        else
        {
            showDetails(req,res)
        }
    });
})

app.get('/getByType',(req,res)=>{
    var sql = "SELECT * FROM housedetails"+" WHERE type="+"'"+req.query.type+"'"
    connection.query(sql, function (err, result) {
        if (err)
        {
            res.json({response: "DB error"})
        }
        else
        {
            res.json(result)
        }
    });
})

app.get('/deleteHouse',(req,res)=>{
    var sql = "DELETE FROM housedetails"+" WHERE houseId="+"'"+req.query.id+"'"
    connection.query(sql, function (err, result) {
        if (err)
        {
            res.json({response: "DB error"})
        }
        else
        {
            console.log(result)
            showDetails(req,res)
        }
    });
})

app.get('/getAll',(req,res)=>{
    var sql = "SELECT * FROM housedetails"
    connection.query(sql, function (err, result) {
        if (err)
        {
            res.json({response: "DB error"})
        }
        else
        {
            res.json(result)
        }
    });
})

app.get('/getHouseId',(req,res)=>{
    var sql = "SELECT * FROM housedetails"+" WHERE houseId="+"'"+req.query.id+"'"
    connection.query(sql, function (err, result) {
        if (err)
        {
            res.json({response: "DB error"})
        }
        else
        {
            res.json(result)
        }
    });
})


