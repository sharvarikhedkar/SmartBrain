const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

app.listen(3000, () => {
    console.log('app is running on port 3000');
});

const database = {
    users:[
        {
        id:'123',
        name:'john',
        email: 'john@gmail.com',
        password: 'cookies',
        entries: 0,
        joined: new Date()
        },
        {
            id:'124',
            name:'sally',
            email: 'sally@gmail.com',
            password: 'bananas',
            entries: 0,
            joined: new Date()
        }
    ]
}

app.get('/',(req,res)=> {
    res.send(database);
});

app.post('/signin',(req,res) => {
    if(req.body.email === database.users[0].email && req.body.password === database.users[0].password){
        res.json("Logged in");
    }else{
        res.status(400).json("Error logging in");
    }
    //res.json("signin is working")
}
)

app.post('/register', (req,res) => {
    const { email, password, name} = req.body;
    database.users.push({
        id:'125',
        name: name,
        email: email,
        password: password,
        entries: 0,
        joined: new Date()
        })
    res.json(database);
})

app.get('/profile/:id',(req,res) => {
    const { id } = req.params;
    let found = false;
    database.users.forEach(user =>{
        if(user.id === id){
            found = true;
            return res.json(user)
        }
        }
    )
    if(!found){
        res.status(400).json("User Not Found");
    }
    //res.json("signin is working")
})

app.put('/image',(req,res) =>{
    const { id } = req.body;
    let found = false;
    database.users.forEach(user =>{
        if(user.id === id){
            found = true;
            user.entries = user.entries + 1;
            return res.json(user.entries);
        }
        }
    )
    if(!found){
        res.status(400).json("User Not Found");
    }
})

/*
/ --> res = this is working
/signing --> POST = success/fail
/register --> POST
/profile/:userID --> GET = user
/image --> PUT = user
*/