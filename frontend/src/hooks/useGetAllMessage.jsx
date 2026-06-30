// import { setMessages } from "@/redux/chatSlice";
// import { setPosts } from "@/redux/postSlice";
// import axios from "axios";
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getPrivateKey , decryptMessage} from "@/utils/crypto.js";

// const useGetAllMessage = () => {
//     const dispatch = useDispatch();
//     const {selectedUser} = useSelector(store=>store.auth);
//     useEffect(() => {
//         const fetchAllMessage = async () => {
//             try {
//                 const privateKey = await getPrivateKey();

//                 const res = await axios.get(`http://localhost:4000/api/v1/message/all/${selectedUser?._id}`, { withCredentials: true });

//                 console.log("Fetched Messages:", res.data.messages); // Log the fetched messages for debugging
//                 const decryptedMessages = await Promise.all(res.data.messages.map(async (message) => {

//                     console.log("Decrypting:", message.message);

//                     const plainText = await decryptMessage(
//                         message.message,   
//                         privateKey
//                     );
//                     return { ...message, text: plainText };
//                 }));
//                 if (res.data.success) {  
//                     dispatch(setMessages(decryptedMessages));
//                 }
//             } catch (error) {
//                 console.log(error);
//             }
//         }
//         fetchAllMessage();
//     }, [selectedUser]);
// };
// export default useGetAllMessage;



// import { setMessages } from "@/redux/chatSlice";
// import axios from "axios";
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getPrivateKey, decryptMessage } from "@/utils/crypto.js";

// import { decryptMessage, importSymmetricKey, decryptFile } from "@/utils/crypto.js";

// const useGetAllMessage = () => {
//     const dispatch = useDispatch();
//     const { selectedUser } = useSelector(store => store.auth);
//     const { user } = useSelector(store => store.auth); 

//     useEffect(() => {
//         if (!selectedUser?._id) return; 

//         const fetchAllMessage = async () => {
//             try {
//                 const privateKey = await getPrivateKey();
//                 const res = await axios.get(`http://localhost:4000/api/v1/message/all/${selectedUser?._id}`, { withCredentials: true });
//                 // console.log("Fetched Messages:", res.data.messages); // Log the fetched messages for debugging
//                 if (res.data.success) {
//                     const decryptedMessages = await Promise.all(res.data.messages.map(async (msg) => {
//                         // console.log("Decrypting:", msg.message);
//                         const isSender = msg.senderId === user._id;
//                         const encryptedPayload = isSender ? msg.senderEncryptedMsg : msg.receiverEncryptedMsg;

//                         const plainText = await decryptMessage(encryptedPayload, privateKey);
                        
//                         return { ...msg, message: plainText }; 
//                     }));
//                     // console.log("Decrypted Messages:", decryptedMessages);
//                     dispatch(setMessages(decryptedMessages));
//                 }
//             } catch (error) {
//                 console.error("Error fetching/decrypting messages:", error);
//             }
//         };

//         fetchAllMessage();
//     }, [selectedUser, user?._id, dispatch]);
// };

// export default useGetAllMessage;


import { setMessages } from "@/redux/chatSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// Cleaned up and consolidated imports
import { 
    getPrivateKey, 
    decryptMessage, 
    importSymmetricKey, 
    decryptFile 
} from "@/utils/crypto.js";

const useGetAllMessage = () => {
    const dispatch = useDispatch();
    const { selectedUser } = useSelector(store => store.auth);
    const { user } = useSelector(store => store.auth); 

    useEffect(() => {
        if (!selectedUser?._id) return; 

        const fetchAllMessage = async () => {
            try {
                const privateKey = await getPrivateKey();
                const res = await axios.get(`http://localhost:4000/api/v1/message/all/${selectedUser?._id}`, { withCredentials: true });
                console.log("Fetched Messages:", res.data.messages); // Log the fetched messages for debugging
                if (res.data.success) {
                    const decryptedMessages = await Promise.all(res.data.messages.map(async (msg) => {
                        const isSender = msg.senderId === user._id;
                        
                        let plainText = "";
                        let decryptedImageUrl = null;

                        // 1. Handle Text Decryption (if text exists)
                        if (msg.senderEncryptedMsg || msg.receiverEncryptedMsg) {
                            const encryptedTextPayload = isSender ? msg.senderEncryptedMsg : msg.receiverEncryptedMsg;
                            if (encryptedTextPayload) {
                                plainText = await decryptMessage(encryptedTextPayload, privateKey);
                            }
                        }

                        // 2. Handle Image Decryption (if an image exists)
                        if (msg.encryptedImage) {
                            // A. Get the correct wrapped AES key
                            const wrappedAesKey = isSender ? msg.senderEncryptedAesKey : msg.receiverEncryptedAesKey;
                            
                            if (wrappedAesKey) {
                                // B. Decrypt the AES key using your RSA Private Key
                                const aesKeyString = await decryptMessage(wrappedAesKey, privateKey);
                                
                                // C. Import it back into a usable Web Crypto AES Key
                                const aesKey = await importSymmetricKey(aesKeyString);
                                
                                // D. Decrypt the actual image payload using the AES key and the IV
                                const imageArrayBuffer = await decryptFile(msg.encryptedImage, msg.imageIv, aesKey);
                                
                                // E. Convert ArrayBuffer to a Blob, then to a URL for the <img> tag
                                const blob = new Blob([imageArrayBuffer]);
                                decryptedImageUrl = URL.createObjectURL(blob);
                            }
                        }

                        // 3. Return the fully processed message object to Redux
                        return { 
                            ...msg, 
                            message: plainText,
                            imageUrl: decryptedImageUrl 
                        }; 
                    }));
                    console.log("Decrypted Messages:", decryptedMessages);
                    dispatch(setMessages(decryptedMessages));
                }
            } catch (error) {
                console.error("Error fetching/decrypting historical messages:", error);
            }
        };

        fetchAllMessage();
    }, [selectedUser, user?._id, dispatch]);
};

export default useGetAllMessage;