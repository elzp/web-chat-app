const express =require('express');
const fs = require('fs');
const cors = require('cors');

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
    console.log(req.body.messages);

    fs.writeFile(req.params.id+'.json', JSON.stringify(req.body.messages),  (err)=>{ if(err) {console.log('error on '+FileName)}else{console.log('send')}})
    res.status(200).send(JSON.stringify(req.body.messages))
    
});

app.get('/:id/conv', (req,res)=>{
    
    const FileName = req.params.id;
    fs.readFile(FileName+'.json', 'utf8', (err,data)=>{ 
        if(err) {
            console.log('error on '+FileName)
       
        }else{
            res.status(200).json(data)
            console.log('send')}})
   
});

app.listen(portOfServer,() =>{ console.log('server is listening on port' + portOfServer)});