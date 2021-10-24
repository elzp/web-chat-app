const express =require('express');
const fs = require('fs');
const cors = require('cors');
const { dirname } = require('path');
const path = require('path');

const app = express();
const portOfReactApp = 3006;
app.use(cors({
    origin: `http://localhost:3006`,
    //optionsSuccessStatus: 200
}));
app.use(express.json()); //to read Json body of requesta
const portOfServer = 3001;

app.post('/:id/conv', (req,res)=>{
    console.log(req.params.id);
    console.log(req.body.messages); //this is in JSON.stringify format

    fs.writeFile(req.params.id+'.json', JSON.stringify(req.body.messages),  (err)=>{ if(err) {console.log('error on '+FileName);
console.log(err);}else{console.log(req.body.messages)}})
    res.status(200).send(req.body.messages)
    
});

app.post('/newuser', async (req, res)=>{
    const userToAdd = req.body;
    // console.log(userToAdd)
    const fileDirectory = __dirname+'/../friends.json';
    // console.log(fileDirectory);
    const actualListOfFriendsFromDB= fs.readFileSync(fileDirectory, 'utf8');
    const parsedData = JSON.parse(actualListOfFriendsFromDB);
    //check if new user's email is in database
    const isEmailInDB = Object.entries(parsedData).map(it=>{it[1].email}).filter(it=> it === userToAdd.email)
    console.log("isEmailInDB" ,isEmailInDB);
    if(isEmailInDB !==[]){
        res.json("used email")
    }
    else{
    const dataToSaveInFile = {...parsedData, [Object.keys(parsedData).length+1]: userToAdd};
    
    fs.writeFile(fileDirectory, JSON.stringify(dataToSaveInFile),  (err)=>{ 
        if(err) {
            console.log('error on '+fileDirectory);
            console.log(err);
        }else{
            console.log("saved in file")
            res.status(200).json("saved")
        }
    })
    }
});

app.get('/:id/conv', (req,res)=>{
    
    const FileName = req.params.id;
    try{fs.readFile(FileName+'.json', 'utf8', (err,data)=>{ 
        if(err) {
            console.log('error on '+FileName)
       
        }else{
            res.status(200).json(data)
            console.log('send')}})
        }catch{res.status(200).json("[]")}
});

app.listen(portOfServer,() =>{ console.log('server is listening on port' + portOfServer)});