const mongoose = require('mongoose');
// used to define the structure of documents (data objects) that will be stored in a MongoDB collection.
const conversationSchema = mongoose.Schema({
    members:{
        type: Array,
        required: true
    }
});


//When we write mongoose.model('Conversation) in simple then in database it take with plural like with s
const Conversation = mongoose.model('Conversation', conversationSchema);
module.exports = Conversation;