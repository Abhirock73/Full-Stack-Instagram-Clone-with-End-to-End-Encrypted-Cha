// import React, { useEffect, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
// import { setSelectedUser } from '@/redux/authSlice';
// import { Input } from './ui/input';
// import { Button } from './ui/button';
// import { MessageCircleCode } from 'lucide-react';
// import Messages from './Messages';
// import axios from 'axios';
// import { setMessages } from '@/redux/chatSlice';

// import { fetchPublicKey } from "../services/keyService.js";
// import { importPublicKey, encryptMessage } from "../utils/crypto.js";


// const ChatPage = () => {
//     const [textMessage, setTextMessage] = useState("");
//     const { user, suggestedUsers, selectedUser } = useSelector(store => store.auth);
//     const { onlineUsers, messages } = useSelector(store => store.chat);
//     const dispatch = useDispatch();

//     // const sendMessageHandler = async (receiverId) => {
//     //     try {
//     //         const publicKeyString = await fetchPublicKey(receiverId);
//     //         const text = textMessage.trim();
//     //         const receiverPublicKey = await importPublicKey(publicKeyString);
//     //         const encryptedText = await encryptMessage(textMessage, receiverPublicKey);
//     //         console.log("Encrypted Text:", encryptedText); // Log the encrypted text for debugging
//     //         const res = await axios.post(`http://localhost:4000/api/v1/message/send/${receiverId}`, { textMessage: encryptedText }, {
//     //             headers: {
//     //                 'Content-Type': 'application/json'
//     //             },
//     //             withCredentials: true
//     //         });

//     //         if (res.data.success) {
//     //             console.log("Message sent successfully:", res.data.newMessage,text);
//     //             dispatch(setMessages(text));
//     //             setTextMessage("");
//     //         }
//     //     } catch (error) {
//     //         console.log(error);
//     //     }
//     // }
//     const sendMessageHandler = async (receiverId) => {
//         try {
//             const text = textMessage.trim();
//             if (!text) return; // Prevent sending empty messages

//             // 1. Fetch BOTH public keys (Receiver's and Sender's)
//             const receiverPublicKeyString = await fetchPublicKey(receiverId);

//             // NOTE: I am assuming `fetchPublicKey` works for the current user too. 
//             // If your own public key is stored locally (e.g., in localStorage or Redux), 
//             // fetch it from there instead to save an API call.
//             const senderPublicKeyString = await fetchPublicKey(user._id);

//             // 2. Import BOTH keys
//             const receiverPublicKey = await importPublicKey(receiverPublicKeyString);
//             const senderPublicKey = await importPublicKey(senderPublicKeyString);

//             // 3. Encrypt the message twice
//             const receiverEncryptedMsg = await encryptMessage(text, receiverPublicKey);
//             const senderEncryptedMsg = await encryptMessage(text, senderPublicKey);

//             // 4. Send to backend
//             const res = await axios.post(`http://localhost:4000/api/v1/message/send/${receiverId}`, {
//                 senderId: user._id,
//                 receiverId: receiverId,
//                 senderEncryptedMsg: senderEncryptedMsg,
//                 receiverEncryptedMsg: receiverEncryptedMsg,
//                 message: text // Keeping this temporarily for your trial phase!
//             }, {
//                 headers: { 'Content-Type': 'application/json' },
//                 withCredentials: true
//             });
//             console.log("Message sent successfully:", res.data.newMessage, text);
//             if (res.data.success) {
//                 // 5. Fix the Redux update
//                 // Previously, you were dispatching just the string (text), which breaks the message array.
//                 // We take the new message from the DB and attach the plaintext so it renders immediately.
//                 const newMsgObj = {
//                     ...res.data.newMessage,
//                     message: text
//                 };

//                 // Append the new message to the existing array
//                 dispatch(setMessages([...messages, newMsgObj]));
//                 setTextMessage("");
//             }
//         } catch (error) {
//             console.error("Error sending message:", error);
//         }
//     }

//     useEffect(() => {
//         return () => {
//             dispatch(setSelectedUser(null));
//         }
//     }, []);

//     return (
//         <div className='flex ml-[16%] h-screen'>
//             <section className='w-full md:w-1/4 my-8'>
//                 <h1 className='font-bold mb-4 px-3 text-xl'>{user?.username}</h1>
//                 <hr className='mb-4 border-gray-300' />
//                 <div className='overflow-y-auto h-[80vh]'>
//                     {
//                         suggestedUsers.map((suggestedUser) => {
//                             const isOnline = onlineUsers.includes(suggestedUser?._id);
//                             return (
//                                 <div onClick={() => dispatch(setSelectedUser(suggestedUser))} className='flex gap-3 items-center p-3 hover:bg-gray-50 cursor-pointer'>
//                                     <Avatar className='w-14 h-14'>
//                                         <AvatarImage src={suggestedUser?.profilePicture} />
//                                         <AvatarFallback className="bg-gray-300 text-gray-800 flex items-center justify-center font-semibold text-lg">{suggestedUser?.username.charAt(0).toUpperCase()}</AvatarFallback>
//                                     </Avatar>
//                                     <div className='flex flex-col'>
//                                         <span className='font-medium'>{suggestedUser?.username}</span>
//                                         <span className={`text-xs font-bold ${isOnline ? 'text-green-600' : 'text-red-600'} `}>{isOnline ? 'online' : 'offline'}</span>
//                                     </div>
//                                 </div>
//                             )
//                         })
//                     }
//                 </div>

//             </section>
//             {
//                 selectedUser ? (
//                     <section className='flex-1 border-l border-l-gray-300 flex flex-col h-full'>
//                         <div className='flex gap-3 items-center px-3 py-2 border-b border-gray-300 sticky top-0 bg-white z-10'>
//                             <Avatar>
//                                 <AvatarImage src={selectedUser?.profilePicture} alt='profile' />
//                                 <AvatarFallback>{selectedUser?.username.charAt(0).toUpperCase()}</AvatarFallback>
//                             </Avatar>
//                             <div className='flex flex-col'>
//                                 <span>{selectedUser?.username}</span>
//                             </div>
//                         </div>
//                         <Messages selectedUser={selectedUser} />
//                         <div className='flex items-center p-4 border-t border-t-gray-300'>
//                             <Input value={textMessage} onChange={(e) => setTextMessage(e.target.value)} type="text" className='flex-1 mr-2 focus-visible:ring-transparent' placeholder="Messages..." />
//                             <Button onClick={() => sendMessageHandler(selectedUser?._id)}>Send</Button>
//                         </div>
//                     </section>
//                 ) : (
//                     <div className='flex flex-col items-center justify-center mx-auto'>
//                         <MessageCircleCode className='w-32 h-32 my-4' />
//                         <h1 className='font-medium'>Your messages</h1>
//                         <span>Send a message to start a chat.</span>
//                     </div>
//                 )
//             }
//         </div>
//     )
// }

// export default ChatPage\



// import React, { useEffect, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
// import { setSelectedUser } from '@/redux/authSlice';
// import { Input } from './ui/input';
// import { Button } from './ui/button';
// import { MessageCircleCode } from 'lucide-react';
// import Messages from './Messages';
// import axios from 'axios';
// import { setMessages } from '@/redux/chatSlice';
// import { setMessageNotification } from '@/redux/rtnSlice';

// import { fetchPublicKey } from "../services/keyService.js";
// import { importPublicKey, encryptMessage } from "../utils/crypto.js";

// const ChatPage = () => {
//     const [textMessage, setTextMessage] = useState("");
//     const { user, suggestedUsers, selectedUser } = useSelector(store => store.auth);
//     const { onlineUsers, messages } = useSelector(store => store.chat);
//     const dispatch = useDispatch();


//     const sendMessageHandler = async (receiverId) => {
//         try {
//             const text = textMessage.trim();
//             if (!text) return; // Prevent sending empty messages

//             // 1. Fetch BOTH public keys
//             const receiverPublicKeyString = await fetchPublicKey(receiverId);
//             const senderPublicKeyString = await fetchPublicKey(user._id);

//             // 2. Import BOTH keys
//             const receiverPublicKey = await importPublicKey(receiverPublicKeyString);
//             const senderPublicKey = await importPublicKey(senderPublicKeyString);

//             // 3. Encrypt the message twice
//             const receiverEncryptedMsg = await encryptMessage(text, receiverPublicKey);
//             const senderEncryptedMsg = await encryptMessage(text, senderPublicKey);

//             // 4. Send to backend
//             const res = await axios.post(`http://localhost:4000/api/v1/message/send/${receiverId}`, {
//                 // textMessage: text,
//                 senderEncryptedMsg,
//                 receiverEncryptedMsg,
//                 // Keeping this temporarily for your trial phase!
//             }, {
//                 headers: { 'Content-Type': 'application/json' },
//                 withCredentials: true
//             });

//             if (res.data.success) {
//                 // 5. Update Redux with plaintext for immediate UI rendering
//                 const newMsgObj = {
//                     ...res.data.newMessage,
//                     message: text
//                 };

//                 // Append the new message to the existing array
//                 dispatch(setMessages([...messages, newMsgObj]));
//                 dispatch(setMessageNotification(newMsgObj)); // Notify the user of the new message
//                 // dispatch(setMessageNotification(newMsgObj)); // Notify the user of the new message
//                 setTextMessage("");
//             }
//         } catch (error) {
//             console.error("Error sending message:", error);
//         }
//     }

//     useEffect(() => {
//         return () => {
//             dispatch(setSelectedUser(null));
//         }
//     }, [dispatch]);

//     return (
//         <div className='flex ml-[16%] h-screen'>
//             <section className='w-full md:w-1/4 my-8'>
//                 <h1 className='font-bold mb-4 px-3 text-xl'>{user?.username}</h1>
//                 <hr className='mb-4 border-gray-300' />
//                 <div className='overflow-y-auto h-[80vh]'>
//                     {
//                         suggestedUsers.map((suggestedUser) => {
//                             const isOnline = onlineUsers.includes(suggestedUser?._id);
//                             return (
//                                 // FIXED: Added missing 'key' prop here
//                                 <div key={suggestedUser?._id} onClick={() => dispatch(setSelectedUser(suggestedUser))} className='flex gap-3 items-center p-3 hover:bg-gray-50 cursor-pointer'>
//                                     <Avatar className='w-14 h-14'>
//                                         <AvatarImage src={suggestedUser?.profilePicture} />
//                                         <AvatarFallback className="bg-gray-300 text-gray-800 flex items-center justify-center font-semibold text-lg">
//                                             {suggestedUser?.username.charAt(0).toUpperCase()}
//                                         </AvatarFallback>
//                                     </Avatar>
//                                     <div className='flex flex-col'>
//                                         <span className='font-medium'>{suggestedUser?.username}</span>
//                                         <span className={`text-xs font-bold ${isOnline ? 'text-green-600' : 'text-red-600'} `}>
//                                             {isOnline ? 'online' : 'offline'}
//                                         </span>
//                                     </div>
//                                 </div>
//                             )
//                         })
//                     }
//                 </div>
//             </section>
//             {
//                 selectedUser ? (
//                     <section className='flex-1 border-l border-l-gray-300 flex flex-col h-full'>
//                         <div className='flex gap-3 items-center px-3 py-2 border-b border-gray-300 sticky top-0 bg-white z-10'>
//                             <Avatar>
//                                 <AvatarImage src={selectedUser?.profilePicture} alt='profile' />
//                                 <AvatarFallback>{selectedUser?.username.charAt(0).toUpperCase()}</AvatarFallback>
//                             </Avatar>
//                             <div className='flex flex-col'>
//                                 <span>{selectedUser?.username}</span>
//                             </div>
//                         </div>
//                         <Messages selectedUser={selectedUser} />
//                         <div className='flex items-center p-4 border-t border-t-gray-300'>
//                             <Input value={textMessage} onChange={(e) => setTextMessage(e.target.value)} type="text" className='flex-1 mr-2 focus-visible:ring-transparent' placeholder="Messages..." />
//                             <Button onClick={() => sendMessageHandler(selectedUser?._id)}>Send</Button>
//                         </div>
//                     </section>
//                 ) : (
//                     <div className='flex flex-col items-center justify-center mx-auto'>
//                         <MessageCircleCode className='w-32 h-32 my-4' />
//                         <h1 className='font-medium'>Your messages</h1>
//                         <span>Send a message to start a chat.</span>
//                     </div>
//                 )
//             }
//         </div>
//     )
// }

// export default ChatPage;



import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { setSelectedUser } from '@/redux/authSlice';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { MessageCircleCode, Image as ImageIcon, X } from 'lucide-react'; // Added icons
import Messages from './Messages';
import axios from 'axios';
import { setMessages } from '@/redux/chatSlice';
import { setMessageNotification } from '@/redux/rtnSlice';

import { fetchPublicKey } from "../services/keyService.js";
// Added the AES functions to the crypto import
import {
    importPublicKey,
    encryptMessage,
    generateSymmetricKey,
    exportSymmetricKey,
    encryptFile
} from "../utils/crypto.js";

const ChatPage = () => {
    const [textMessage, setTextMessage] = useState("");

    // NEW: Image State and Refs
    const [selectedImage, setSelectedImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const imageInputRef = useRef(null);

    const { user, suggestedUsers, selectedUser } = useSelector(store => store.auth);
    const { onlineUsers, messages } = useSelector(store => store.chat);
    const dispatch = useDispatch();

    // NEW: Image selection handlers
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // 1. Define your limit (e.g., 5MB = 5 * 1024 * 1024 bytes)
        const MAX_FILE_SIZE = 5*1024*1023; // 5MB   ;

        // 2. Validate Size
        if (file.size > MAX_FILE_SIZE) {
            // You can use a library like 'react-hot-toast' or a simple alert
            alert("This image is too large! Please select an image smaller than 5MB.");

            // 3. Automatically drop the image
            setSelectedImage(null);
            setImagePreview(null);
            if (imageInputRef.current) imageInputRef.current.value = "";

            return; // Stop here
        }

        // 4. If size is okay, proceed as normal
        setSelectedImage(file);
        setImagePreview(URL.createObjectURL(file));
    };
    const removeImage = () => {
        setSelectedImage(null);
        setImagePreview(null);
        if (imageInputRef.current) imageInputRef.current.value = "";
    };

    // UPDATED: Handles sending Text, Image, or Both
    const sendMessageHandler = async (receiverId) => {
        try {
            const text = textMessage.trim();

            // Prevent sending if both text and image are empty
            if (!text && !selectedImage) return;

            // 1. Fetch & Import BOTH RSA public keys
            const receiverPublicKeyString = await fetchPublicKey(receiverId);
            const senderPublicKeyString = await fetchPublicKey(user._id);
            const receiverPublicKey = await importPublicKey(receiverPublicKeyString);
            const senderPublicKey = await importPublicKey(senderPublicKeyString);

            // 2. Prepare the payload object
            let payload = {};
            let localImageUrl = null;

            // 3. Handle Text Encryption (if text exists)
            if (text) {
                payload.receiverEncryptedMsg = await encryptMessage(text, receiverPublicKey);
                payload.senderEncryptedMsg = await encryptMessage(text, senderPublicKey);
            }

            // 4. Handle Image Encryption (if image exists)
            if (selectedImage) {
                const arrayBuffer = await selectedImage.arrayBuffer();

                // Generate AES Key and encrypt the file
                const aesKey = await generateSymmetricKey();
                const { encryptedFileBase64, ivBase64 } = await encryptFile(arrayBuffer, aesKey);

                // Export AES Key and wrap it with RSA
                const aesKeyString = await exportSymmetricKey(aesKey);

                payload.encryptedImage = encryptedFileBase64;
                payload.imageIv = ivBase64;
                payload.receiverEncryptedAesKey = await encryptMessage(aesKeyString, receiverPublicKey);
                payload.senderEncryptedAesKey = await encryptMessage(aesKeyString, senderPublicKey);

                // Save the preview URL so the sender sees it immediately in their chat
                localImageUrl = imagePreview;
            }

            // 5. Send to backend
            const res = await axios.post(`https://full-stack-instagram-clone-with-end-to.onrender.com/api/v1/message/send/${receiverId}`, payload, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            });

            if (res.data.success) {
                // 6. Update Redux with plaintext/local image for immediate UI rendering
                const newMsgObj = {
                    ...res.data.newMessage,
                    message: text,
                    imageUrl: localImageUrl // Mount the image preview URL
                };

                dispatch(setMessages([...messages, newMsgObj]));
                dispatch(setMessageNotification(newMsgObj));

                // 7. Clear inputs
                setTextMessage("");
                removeImage();
            }
        } catch (error) {
            console.error("Error sending message:", error);
        }
    }

    useEffect(() => {
        return () => {
            dispatch(setSelectedUser(null));
        }
    }, [dispatch]);

    return (
        <div className='flex ml-[16%] h-screen'>
            <section className='w-full md:w-1/4 my-8'>
                <h1 className='font-bold mb-4 px-3 text-xl'>{user?.username}</h1>
                <hr className='mb-4 border-gray-300' />
                <div className='overflow-y-auto h-[80vh]'>
                    {
                        suggestedUsers.map((suggestedUser) => {
                            const isOnline = onlineUsers.includes(suggestedUser?._id);
                            return (
                                <div key={suggestedUser?._id} onClick={() => dispatch(setSelectedUser(suggestedUser))} className='flex gap-3 items-center p-3 hover:bg-gray-50 cursor-pointer'>
                                    <Avatar className='w-14 h-14'>
                                        <AvatarImage src={suggestedUser?.profilePicture} />
                                        <AvatarFallback className="bg-gray-300 text-gray-800 flex items-center justify-center font-semibold text-lg">
                                            {suggestedUser?.username.charAt(0).toUpperCase()}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className='flex flex-col'>
                                        <span className='font-medium'>{suggestedUser?.username}</span>
                                        <span className={`text-xs font-bold ${isOnline ? 'text-green-600' : 'text-red-600'} `}>
                                            {isOnline ? 'online' : 'offline'}
                                        </span>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </section>
            {
                selectedUser ? (
                    <section className='flex-1 border-l border-l-gray-300 flex flex-col h-full'>
                        <div className='flex gap-3 items-center px-3 py-2 border-b border-gray-300 sticky top-0 bg-white z-10'>
                            <Avatar>
                                <AvatarImage src={selectedUser?.profilePicture} alt='profile' />
                                <AvatarFallback>{selectedUser?.username.charAt(0).toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <div className='flex flex-col'>
                                <span>{selectedUser?.username}</span>
                            </div>
                        </div>

                        <Messages selectedUser={selectedUser} />

                        {/* NEW: Image Preview Area */}
                        {imagePreview && (
                            <div className="p-3 border-t border-gray-300 bg-gray-50 flex items-center gap-4">
                                <div className="relative">
                                    <img src={imagePreview} alt="Preview" className="h-16 w-16 object-cover rounded-md shadow-sm" />
                                    <button
                                        onClick={removeImage}
                                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition"
                                    >
                                        <X size={14} />
                                    </button>
                                </div>
                                <span className="text-sm text-gray-500 font-medium">Image attached and ready to encrypt</span>
                            </div>
                        )}

                        {/* UPDATED: Input Bar with Image Upload Button */}
                        <div className='flex items-center p-4 border-t border-t-gray-300 bg-white'>

                            {/* Hidden File Input */}
                            <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                ref={imageInputRef}
                                onChange={handleImageChange}
                            />

                            {/* Image Icon Button */}
                            <Button
                                variant="ghost"
                                className="mr-2 text-gray-500 hover:text-blue-500"
                                onClick={() => imageInputRef.current.click()}
                            >
                                <ImageIcon size={24} />
                            </Button>

                            <Input
                                value={textMessage}
                                onChange={(e) => setTextMessage(e.target.value)}
                                type="text"
                                className='flex-1 mr-2 focus-visible:ring-transparent'
                                placeholder="Type a message..."
                            />
                            <Button onClick={() => sendMessageHandler(selectedUser?._id)}>Send</Button>
                        </div>
                    </section>
                ) : (
                    <div className='flex flex-col items-center justify-center mx-auto'>
                        <MessageCircleCode className='w-32 h-32 my-4' />
                        <h1 className='font-medium'>Your messages</h1>
                        <span>Send a message to start a chat.</span>
                    </div>
                )
            }
        </div>
    )
}


export default ChatPage;
