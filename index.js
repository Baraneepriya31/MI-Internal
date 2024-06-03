const express = require("express");
const users = require("./sample.json");
const app = express();
const port = 4000;
const cors =require('cors');
const fs = require('fs');

app.use(cors());
app.use(express.json());
app.get("/users", (req,res) =>{
   return res.json(users);
});

app.delete("/users/:id", (req,res) => {
    let id = Number(req.params.id);
    let filteredusers=users.filter((user) => user.id !== id)
    fs.writeFile("./sample.json" ,JSON.stringify(filteredusers), 
    (err, data) => {
        return res.json(filteredusers);
    });
});

//Add new user

app.post("/users", (req,res) => {
  let {name,registerno, department,city}  = req.body; 
  if(!name || !registerno || !department || !city){
    res.status(400).send({
        message:"All Fields Required"
    });
  } 
  let id = Date.now();
  users.push({id,name,registerno,department,city});
  fs.writeFile("./sample.json" ,JSON.stringify(users), 
  (err, data) => {
    return res.json({message:"User Detail addedsuccessfully"});
});
  });
   
   //update user

   app.patch("/users/:id", (req,res) => {
    let id = Number(req.params.id);
    let {name,registerno, department,city}  = req.body; 
    if(!name || !registerno || !department || !city){
      res.status(400).send({
          message:"All Fields Required"
      });
    } 
    
    let index =users.findIndex((user) => user.id == id);
    users.splice(index,1, {...req.body});
    fs.writeFile("./sample.json" ,JSON.stringify(users), 
    (err, data) => {
      return res.json({message:"User Detail updated successfully"});
  });
    });
     

app.listen(port, (err) => {
    console.log(`App is running in port ${port}`);
});