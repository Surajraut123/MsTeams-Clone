const express = require('express');
const bcryptjs = require('bcryptjs')
const jsonwebtoken = require('jsonwebtoken');
const cors = require('cors')
const cookieParser = require('cookie-parser');
//Connnect DB
require('./db/connection')

//Import Files
const Users = require('./models/Users');
// const { toBePartiallyChecked } = require('@testing-library/jest-dom/matchers');
const Conversation = require('./models/Conversations');
const Messages = require('./models/Messages');

const port  = process.env.PORT || 8000;

//App use
const app = express();
app.use(express.json())
app.use(express.urlencoded({extended: false}));

const corsOptions = {
    origin: 'http://localhost:3000', // React app domain
    credentials: true // Enable sending of cookies
};
app.use(cors(corsOptions))
app.use(cookieParser());
//Routes
app.get('/', (req, res) => {
    res.send('Welcome')

})

app.post('/api/register', async (req, res, next) =>{
    try{
        const {fullName, email, password} = req.body

        if(!fullName || !email || !password) {
            res.status(500).json({message: "Please fill all required fields"})
        }else{
            const isAlreadyExist = await Users.findOne({email});
            if(isAlreadyExist) {
                res.status(500).json({message: "User Already Exist"})
            } else{
                const newUser = new Users({fullName, email});
                bcryptjs.hash(password, 10, (err, hashedPassword) =>{
                    newUser.set('password', hashedPassword);
                    newUser.save();
                    next();
                })
                return res.status(200).json({message: 'User registered successully', user:{id: newUser._id}});

                //To send the data in json so will not need to use send 
                // return res.status(200).json({message : 'User registered successully'});
            }
        }


    } catch(e){
        console.log(e)
    }
})

app.post('/api/login', async (req, res, next) =>{
    try{
        const {email, password} = req.body;
        if(!email || !password) {
            res.status(400).json({message: "Please fill all required fields"})
        } else{
            const user = await Users.findOne({email});
            if(!user) {
                res.status(400).json({message: "Invalid username or password"});
            } else{
                const vallidateUser = await bcryptjs.compare(password, user.password);
                if(!vallidateUser) {
                    res.status(400).json({message: "Invalid username or password"});
                } else{
                    const payLoad = {
                        userId: user._id,
                        email: user.email
                    }

                    const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'THIS_IS_JWT_SECRET_KEY';
                    jsonwebtoken.sign(payLoad, JWT_SECRET_KEY, {expiresIn: 84600}, async(err, token) =>{
                        await Users.updateOne({_id: user._id}, {
                            $set: {token}
                        })
                        user.save();
                        res.cookie('token', token, {httpOnly: false, secure: true, sameSite: 'none'})
                        console.log(req.cookies)
                        return res.status(200).json({user: {id: user._id, email: user.email, fullName: user.fullName }, token: user.token})
                    })
                }
            }
        }
    } catch(e) {
        console.log(e);
    }
})


app.post('/api/conversation', async (req, res) =>{
    try{
        const {senderId, receiverId} = req.body;
        const newConversation = new Conversation({members : [senderId, receiverId]});
        await newConversation.save();
        res.status(200).json({message: "Conversation Created"})
    } catch(e){
        console.log(e)
    }
})


//It chekcing in the conversation field that, if loggedinUserid is exist in a particular conversation object then the rest of id will the received id. so to showcase the conversations on the chat list which is beging happened.
app.get('/api/conversation/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const conversations = await Conversation.find({members: {$in: [userId]}});
        const conversationUserData = await Promise.all(conversations.map(async (conversation) => {
            const receiverId = conversation.members.find(member => member !== userId);
            const user = await Users.findById(receiverId);
            if (user) {
                return {
                    user: {
                        email: user.email, 
                        fullName: user.fullName,
                        userid: user._id
                    }, 
                    conversationId: conversation._id
                };
            } else {
                return {
                    user: null, 
                    conversationId: conversation._id
                };
            }
        }));

        // You might want to filter out conversations where user is null, depending on your use case
        const filteredConversationUserData = conversationUserData.filter(data => data.user !== null);

        res.status(200).json(filteredConversationUserData);
    } catch (e) {
        console.log(e);
        res.status(500).send('Server error');
    }
});

app.post('/api/checkconversation', async (req, res)=> {
    try {
        const {senderId, receiverId} = req.body;
        const isPresent = await Conversation.find({members: {$all: [senderId, receiverId]}})
        res.status(200).json(isPresent);
    } catch (error) {
        res.status(500).json({"error":error})
    }

})

app.post('/api/message', async (req, res) =>{
    try{
        const {conversationId, senderId, message, receiverId = ''} = req.body
        console.log(conversationId, senderId, message, receiverId);
        if( !senderId || !message) return res.status(400).json({message: 'Please fill all required fields from post api message', action: false})
        // if(conversationId === 'new' && receiverId) {
        //     const newConversation = new Conversation({member: [senderId, receiverId]});
        //     await newConversation.save();
        //     const newMessage = new Messages({conversationId: newConversation._id, senderId, message})
        //     await newMessage.save();
        //     return res.status(200).send('Message Sent Successfully');

        // } else if(!conversationId && !receiverId){
            // return res.status(400).send('Please fill all required fields');
        // }
        // const newMessage = new Messages({conversationId, senderId, message});
        // await newMessage.save();
        res.status(200).json({message: 'Message Sent Successfully', action: true});
    } catch(e) {
        console.log(e)
    }
})

app.get('/api/message/:conversationId', async (req, res) =>{
    try{
        const checkMessages = async (conversationId) => {
            const messages = await Messages.find({conversationId})
            const messageUserData = Promise.all(messages.map(async (message) =>{
                const user  = await Users.findById(message.senderId);
                return {user: {id: user._id, email: user.email, fullName: user.fullName}, message: message.message};
            }))
            res.status(200).json(await messageUserData);
        }
        const conversationId = req.params.conversationId;
        const messageArray = await Messages.find({conversationId})
        if(messageArray.length === 0) {
            // const checkConversation = await Conversation.find({members : {$all : [req.query.senderId, req.query.receiverId]}});
            // console.log(checkConversation);
            // if(checkConversation.length > 0){
            //     checkMessages(checkConversation[0]._id);
            // } else{
                return res.status(200).json([{user: '', message: "Say Hello!"}])
            // }
        } else{
            checkMessages(conversationId)
        }
    } catch(e) {
        console.log(e)
    }
})

app.get('/api/users/:userId', async (req, res) =>{
    try{
        const userId = req.params.userId;
        const users = await Users.find({_id:{$ne: userId}});
        const usersData = Promise.all(users.map(async (user) =>{
            return {user: {email: user.email, fullName: user.fullName, receiverId: user._id}}
        }))
        res.status(200).json(await usersData);
    }catch(e) {
        console.log(e)
    }
})

app.get('/api/users', async (req, res) =>{
    try{
        const users = await Users.find({});
        const userArray = [];
        const allUser = Promise.all(users.map(async (user) => {
            userArray.push({userid: user._id, fullname: user.fullName, token: user.token}); 
        }))
        res.status(200).json({userData : userArray})
    } catch(e) {
        console.log(e);
    }
})

app.get('/api/newconversation/:userId', async (req, res) => {
    try {
        const loggedUser = req.params.userId;
        const users = await Users.find({});
        const conversations = await Conversation.find({ members: { $in: [loggedUser] } });

        const userArray = [];
        for (const user of users) {
            let isAvailable = false;
            for (const conversation of conversations) {
                const receiverId = conversation.members.find(member => member !== loggedUser);
                if (user._id.toString() === receiverId) {
                    isAvailable = true;
                }
            }
            if (!isAvailable) {
                userArray.push(user);
            }
        }
        res.status(200).json({ userData: userArray });
    } catch (e) {
        console.log(e);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/api/checkToken', async (req, res, next) => {
    const token = req.cookie;
    console.log(token);
    if (!token) {
        return res.status(401).json({ isValid: false, message: "No token provided" });
    }

})

app.listen(port, () => {
    console.log('listening on port ' + port);
})