const express = require("express");
const app = express();
const db = require("./models");
const PORT = process.env.PORT || 3001;
const cors = require('cors')

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors(
    {
        origin: "*",
    }
))

db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
      console.log(`listening on: http://localhost:${PORT}`);
    });
});

app.get('/',(req,res)=>{
    res.send("Welcome to house management")
})

app.get('/start',(req,res)=>{
    db.housedetails.findAll().then(tableValues=>{
        res.send(tableValues)
    })
})

app.post('/saveHouse',(req,res)=>{
    db.housedetails.create({
        houseId:  req.body.houseId,
        houseNo: req.body.houseNo,
        status: req.body.status,
        type: req.body.type
    })
    .then(tableValues => res.send(tableValues))
    .catch(err=>res.json({response: "Already Exist"}));
})

app.get('/getByType',(req,res)=>{
    db.housedetails.findAll({
        where: {
            type: req.query.type
        }
      }).then(tableValues=>{
        res.send(tableValues)
    })
})

app.get('/deleteHouse',(req,res)=>{
    db.housedetails.destroy({
        where: {
            houseId: req.query.id
        }
      }).then(() => 
        db.housedetails.findAll().then(tableValues=>{
            res.send(tableValues)
    }));
})

app.get('/getAll',(req,res)=>{
    db.housedetails.findAll().then(tableValues=>{
        res.send(tableValues)
    })
})

app.get('/getHouseId',(req,res)=>{
    db.housedetails.findAll({
        where: {
            houseId: req.query.id
        }
      }).then(tableValues=>{
        res.send(tableValues)
    })
})