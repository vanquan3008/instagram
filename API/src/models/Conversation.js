const mongoose = require('mongoose');


const ConversationSchema = new mongoose.Schema9({
        members: {
            type : 'Array',
            default : []
        },
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model("Conversation", ConversationSchema)