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
    const isEmailInDB = Object.values(parsedData).filter(it=>it.email=== userToAdd.email);
    if(isEmailInDB.length >0){
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


// //socket.io
// //https://www.fullstacklabs.co/blog/chat-application-react-express-socket-io
const conversationsData = [
    {
        id: "1-2",
        sockets : [],
        participants: 0,
        messages: [],
    },
    {
        id: "1-4",
        sockets : [],
        participants: 0,
        messages: [],
    },
    {
        id: "2-4",
        sockets : [],
        participants: 0,
        messages: [],
    },
    ];

const app2 = require('express')();
const http = require('http').createServer(app2);

var io = require('socket.io')(http, {
    cors: {
        origin: `http://localhost:3006`,
    }
});
const PORT = 8080;

http.listen(PORT, () => {
    console.log(`listening on *:${PORT}`);
});

io.on('connection', (socket) => { /* socket object may be used to send specific messages to the new connected client */
    
        socket.emit('connection', null);
        socket.on('channel-join', id => {
            console.log('channel join', id);
            conversationsData.forEach(c => {
                if (c.id === id) {
                    if (c.sockets.indexOf(socket.id) == (-1)) {
                        c.sockets.push(socket.id);
                        c.participants++;
                        console.log("channel emited- participant added", c)

                        io.emit('channel', c);
                    }
                } else {
                    let index = c.sockets.indexOf(socket.id);
                    if (index != (-1)) {
                        c.sockets.splice(index, 1);
                        c.participants--;
                        console.log("channel emited- participant deleted")

                        io.emit('channel', c);
                    }
                }
            });
    
            return id;
        });
        socket.on('send-message', message => {
            console.log("message from 8080",message)
            io.emit('message', message);
        });
    
        socket.on('disconnect', () => {
            conversationsData.forEach(c => {
                let index = c.sockets.indexOf(socket.id);
                if (index != (-1)) {
                    c.sockets.splice(index, 1); //adding sockets
                    c.participants--;
                    console.log("channel disconnect")
                    io.emit('channel', c);
                }
            });
        });
    
    });
    //send data obout socket conversations
    app2.use(cors({
    origin: `http://localhost:3006`,
    //optionsSuccessStatus: 200
    }));
    app2.get('/getChannels', (req, res) => {
        res.json(
            conversationsData
        )
    });
//  or https://www.section.io/engineering-education/creating-a-real-time-chat-app-with-react-socket-io-with-e2e-encryption/


            