// // import { setMessages } from "@/redux/chatSlice";
// // import { setMessageNotification } from "@/redux/rtnSlice";
// // import { useEffect } from "react";
// // import { useDispatch, useSelector } from "react-redux";

// // import { getPrivateKey, decryptMessage } from "@/utils/crypto.js";

// // const useGetRTM = () => {
// //     const dispatch = useDispatch();
// //     const { socket } = useSelector(store => store.socketio);
// //     const { messages } = useSelector(store => store.chat);
// //     useEffect(() => {
// //         socket?.on('newMessage', async (newMessage) => {
// //             const privateKey = await getPrivateKey();

// //             const plainText = await decryptMessage(
// //                 newMessage.text,
// //                 privateKey
// //             );

// //             newMessage.text = plainText;

// //             dispatch(setMessages([...messages, newMessage]));
// //             dispatch(setMessages(newMessage));
// //             dispatch(setMessageNotification(newMessage));
// //         })
// //         return () => {
// //             socket?.off('newMessage');
// //         }
// //     }, [messages, setMessages]);
// // };
// // export default useGetRTM;


// import { setMessages } from "@/redux/chatSlice";
// import { setMessageNotification } from "@/redux/rtnSlice";
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getPrivateKey, decryptMessage } from "@/utils/crypto.js";

// const useGetRTM = () => {
//     const dispatch = useDispatch();
//     const { socket } = useSelector(store => store.socketio);
//     const { messages } = useSelector(store => store.chat);
//     const { user } = useSelector(store => store.auth); 

//     useEffect(() => {
//         if (!socket) return; 

//         const handleNewMessage = async (newMessage) => {
//             try {
//                 const privateKey = await getPrivateKey();
                
//                 const isSender = newMessage.senderId === user?._id;
//                 const encryptedPayload = isSender ? newMessage.senderEncryptedMsg : newMessage.receiverEncryptedMsg;
//                 console.log("Encrypted real-time message:", encryptedPayload,isSender ? " (sender)" : " (receiver)");
//                 const plainText = await decryptMessage(encryptedPayload, privateKey);
//                 console.log("Decrypted real-time message:", plainText);
//                 const decryptedNewMessage = { ...newMessage, message: plainText };

//                 // Because of the chatSlice fix, this array spread now works perfectly!
//                 dispatch(setMessages([...messages, decryptedNewMessage]));
//                 dispatch(setMessageNotification());
                
//             } catch (error) {
//                 console.error("Error decrypting real-time message:", error);
//             }
//         };

//         socket.on('newMessage', handleNewMessage);

//         return () => {
//             socket.off('newMessage', handleNewMessage);
//         };
//     }, [socket, messages, dispatch, user?._id]); 
// };

// export default useGetRTM;






import { setMessages } from "@/redux/chatSlice";
import { setMessageNotification } from "@/redux/rtnSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// Make sure to import the new AES utility functions
import { 
    getPrivateKey, 
    decryptMessage, 
    importSymmetricKey, 
    decryptFile 
} from "@/utils/crypto.js";

const useGetRTM = () => {
    const dispatch = useDispatch();
    const { socket } = useSelector(store => store.socketio);
    const { messages } = useSelector(store => store.chat);
    const { user } = useSelector(store => store.auth); 

    useEffect(() => {
        if (!socket) return; 

        const handleNewMessage = async (newMessage) => {
            try {
                const privateKey = await getPrivateKey();
                const isSender = newMessage.senderId === user?._id;
                
                let plainText = "";
                let decryptedImageUrl = null;

                // 1. Handle Text Decryption (if text exists)
                if (newMessage.senderEncryptedMsg || newMessage.receiverEncryptedMsg) {
                    const encryptedTextPayload = isSender ? newMessage.senderEncryptedMsg : newMessage.receiverEncryptedMsg;
                    if (encryptedTextPayload) {
                        plainText = await decryptMessage(encryptedTextPayload, privateKey);
                    }
                }

                // 2. Handle Image Decryption (if an image exists)
                if (newMessage.encryptedImage) {
                    // A. Get the correct wrapped AES key
                    const wrappedAesKey = isSender ? newMessage.senderEncryptedAesKey : newMessage.receiverEncryptedAesKey;
                    
                    if (wrappedAesKey) {
                        // B. Decrypt the AES key using your RSA Private Key
                        const aesKeyString = await decryptMessage(wrappedAesKey, privateKey);
                        
                        // C. Import it back into a usable Web Crypto AES Key
                        const aesKey = await importSymmetricKey(aesKeyString);
                        
                        // D. Decrypt the actual image payload using the AES key and the IV
                        const imageArrayBuffer = await decryptFile(newMessage.encryptedImage, newMessage.imageIv, aesKey);
                        
                        // E. Convert ArrayBuffer to a Blob, then to a URL for the <img> tag
                        const blob = new Blob([imageArrayBuffer]);
                        decryptedImageUrl = URL.createObjectURL(blob);
                    }
                }

                // 3. Assemble the final message object for Redux
                const decryptedNewMessage = { 
                    ...newMessage, 
                    message: plainText,
                    imageUrl: decryptedImageUrl 
                };

                // 4. Update the UI
                dispatch(setMessages([...messages, decryptedNewMessage]));
                
                // FIXED: Passed the payload into the notification dispatcher!
                dispatch(setMessageNotification(decryptedNewMessage));
                
            } catch (error) {
                console.error("Error decrypting real-time message:", error);
            }
        };

        socket.on('newMessage', handleNewMessage);

        return () => {
            socket.off('newMessage', handleNewMessage);
        };
    }, [socket, messages, dispatch, user?._id]); 
};

export default useGetRTM;