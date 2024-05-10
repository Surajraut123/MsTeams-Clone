const mongoose = require('mongoose');

const url = 'mongodb+srv://surajraut45:Suraj123@cluster0.ol1obms.mongodb.net/ChatApp?retryWrites=true&w=majority';

mongoose.connect(url).then(() => console.log('Connected to db')).catch((e) => console.log('Error ', e));
