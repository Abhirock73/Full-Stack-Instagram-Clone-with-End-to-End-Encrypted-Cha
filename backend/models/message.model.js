import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    senderEncryptedMsg:{
        type: String,
        
    },
    receiverEncryptedMsg:{
        type: String,
       
    },

// NEW: Media Messaging
    encryptedImage: { type: String, default: "" }, // The AES-encrypted image
    imageIv: { type: String, default: "" },        // The AES initialization vector
    senderEncryptedAesKey: { type: String, default: "" },   // The AES key encrypted with Sender's RSA
    receiverEncryptedAesKey: { type: String, default: "" }, // The AES key encrypted with Receiver's RSA

},{ timestamps: true });
export const Message = mongoose.model('Message', messageSchema);