import {Conversation} from "../models/conversation.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";
import {Message} from "../models/message.model.js"


// for chatting
// export const sendMessage = async (req,res) => {
//     try {
//         const senderId = req.id;
//         const receiverId = req.params.id;
//         const { senderEncryptedMsg, receiverEncryptedMsg} = req.body;
      
//         let conversation = await Conversation.findOne({
//             participants:{$all:[senderId, receiverId]}
//         });
//         // establish the conversation if not started yet.
//         if(!conversation){
//             conversation = await Conversation.create({
//                 participants:[senderId, receiverId]
//             })
//         };
//         const newMessage = await Message.create({
//             senderId,
//             receiverId,
//             senderEncryptedMsg,
//             receiverEncryptedMsg,
//             // message:textMessage,
//         });
//         if(newMessage) conversation.messages.push(newMessage._id);

//         await Promise.all([conversation.save(),newMessage.save()])

//         // implement socket io for real time data transfer
//         const receiverSocketId = getReceiverSocketId(receiverId);
//         if(receiverSocketId){
//             io.to(receiverSocketId).emit('newMessage', newMessage);
//         }

//         return res.status(201).json({
//             success:true,
//             newMessage
//         })
//     } catch (error) {
//         console.log(error);
//     }
// }



export const sendMessage = async (req, res) => {
    try {
        const senderId = req.id;
        const receiverId = req.params.id;
        
        const { 
            senderEncryptedMsg, 
            receiverEncryptedMsg, 
            encryptedImage, 
            imageIv, 
            senderEncryptedAesKey, 
            receiverEncryptedAesKey 
        } = req.body;

        // 1. Find or create the conversation
        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        });

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId]
            });
        }

        // 2. Create the message
        const newMessage = await Message.create({
            senderId,
            receiverId,
            senderEncryptedMsg: senderEncryptedMsg || "", // Fallback to empty string if missing
            receiverEncryptedMsg: receiverEncryptedMsg || "",
            encryptedImage: encryptedImage || "",
            imageIv: imageIv || "",
            senderEncryptedAesKey: senderEncryptedAesKey || "",
            receiverEncryptedAesKey: receiverEncryptedAesKey || ""
        });

        // 3. Link message to conversation
        if (newMessage) {
            conversation.messages.push(newMessage._id);
        }

        // 4. Save both (using Promise.all for performance)
        await Promise.all([conversation.save(), newMessage.save()]);

        // 5. Emit via Socket.io
        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit('newMessage', newMessage);
        }

        return res.status(201).json({
            success: true,
            newMessage
        });
    } catch (error) {
        console.error("Error in sendMessage controller:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export const getMessage = async (req,res) => {
    try {
        const senderId = req.id;
        const receiverId = req.params.id;
        const conversation = await Conversation.findOne({
            participants:{$all: [senderId, receiverId]}
        }).populate('messages');
        // console.log("senderId:", senderId, "receiverId:", receiverId);
        // console.log("Fetched Messages:", conversation?.messages); // Log the fetched messages for debugging
        if(!conversation) return res.status(200).json({success:true, messages:[]});
        // console.log("Fetched Messages:", conversation?.messages); // Log the fetched messages for debugging
        return res.status(200).json({success:true, messages:conversation?.messages});
        
    } catch (error) {
        console.log(error);
    }
}