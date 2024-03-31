const mongoose = require('mongoose');

const url = 'mongodb+srv://chat_app_admin:Surajrr%401058@cluster0.ol1obms.mongodb.net/ChatApp?retryWrites=true&w=majority';

mongoose.connect(url).then(() => console.log('Connected to db')).catch((e) => console.log('Error ', e));
