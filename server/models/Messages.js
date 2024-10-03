const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
    conversationId:{
        type: String
    },
    senderId: {
        type: String
    },
    message:{
        type: String
    },
    sentAt: {
        type: Date
    }
});

const Messages = mongoose.model('Message', messageSchema);
module.exports = Messages;