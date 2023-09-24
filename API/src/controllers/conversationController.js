const Conversation = require('../models/Conversation.js');


const ConversationController = {
    //Get conversation

    createConversation: async ( req , res)=>{
        const {senderid , reciverid} = req.body; 
        try{
            const Conv = Conversation.findOne({
                members : {$all : [senderid,reciverid]}
            })
            if(Conv){
                return res.status(200).json({Cov})
            }
            else{
                const newCov = new Conversation({
                    members : [senderid,reciverid]
                })
                const response = newCov.save() 
                return res.status(200).json({response})
            }
        }
        catch(err){
            res.status(500).json({message: "Error creating conversation"});
        }
    }
}