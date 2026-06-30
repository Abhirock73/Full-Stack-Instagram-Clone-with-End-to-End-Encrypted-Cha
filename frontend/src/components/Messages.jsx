// // import React from 'react'
// // import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
// // import { Button } from './ui/button'
// // import { Link } from 'react-router-dom'
// // import { useSelector } from 'react-redux'
// // import useGetAllMessage from '@/hooks/useGetAllMessage'
// // import useGetRTM from '@/hooks/useGetRTM'

// // const Messages = ({ selectedUser }) => {
// //     useGetRTM();
// //     useGetAllMessage();
// //     const {messages} = useSelector(store=>store.chat);
// //     const {user} = useSelector(store=>store.auth);
// //     return (    
// //         <div className='overflow-y-auto flex-1 p-4'>
// //             <div className='flex justify-center'>
// //                 <div className='flex flex-col items-center justify-center'>
// //                     <Avatar className="h-20 w-20">
// //                         <AvatarImage src={selectedUser?.profilePicture} alt='profile' />
// //                         <AvatarFallback className="bg-gray-300 text-gray-800 flex items-center justify-center font-bold text-xl">{selectedUser?.username.charAt(0).toUpperCase()}</AvatarFallback>
// //                     </Avatar>
// //                     <span>{selectedUser?.username}</span>
// //                     <Link to={`/profile/${selectedUser?._id}`}><Button className="h-8 my-2" variant="secondary">View profile</Button></Link>
// //                 </div>
// //             </div>
// //             <div className='flex flex-col gap-3'>
// //                 {
// //                    messages && messages.map((msg) => {
// //                         return (
// //                             <div key={msg._id} className={`flex ${msg.senderId === user?._id ? 'justify-end' : 'justify-start'}`}>
// //                                 <div className={`p-2 rounded-lg max-w-xs wrap-break-words ${msg.senderId === user?._id ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}>
// //                                     {msg.message}
// //                                 </div>
// //                             </div>
// //                         )
// //                     })
// //                 }

// //             </div>
// //         </div>  
// //     )
// // }

// // export default Messages

// import React from 'react'
// import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
// import { Button } from './ui/button'
// import { Link } from 'react-router-dom'
// import { useSelector } from 'react-redux'
// import useGetAllMessage from '@/hooks/useGetAllMessage'
// import useGetRTM from '@/hooks/useGetRTM'

// const Messages = ({ selectedUser }) => {
//     useGetRTM();
//     useGetAllMessage();
//     const { messages } = useSelector(store => store.chat);
//     const { user } = useSelector(store => store.auth);

//     return (    
//         <div className='overflow-y-auto flex-1 p-4'>
//             <div className='flex justify-center'>
//                 <div className='flex flex-col items-center justify-center'>
//                     <Avatar className="h-20 w-20">
//                         <AvatarImage src={selectedUser?.profilePicture} alt='profile' />
//                         <AvatarFallback className="bg-gray-300 text-gray-800 flex items-center justify-center font-bold text-xl">
//                             {selectedUser?.username.charAt(0).toUpperCase()}
//                         </AvatarFallback>
//                     </Avatar>
//                     <span>{selectedUser?.username}</span>
//                     <Link to={`/profile/${selectedUser?._id}`}>
//                         <Button className="h-8 my-2" variant="secondary">View profile</Button>
//                     </Link>
//                 </div>
//             </div>
//             <div className='flex flex-col gap-3'>
//                 {
//                    messages && messages.map((msg) => {
//                         return (
//                             <div key={msg._id} className={`flex ${msg.senderId === user?._id ? 'justify-end' : 'justify-start'}`}>
//                                 <div className={`p-2 rounded-lg max-w-xs wrap-break-words ${msg.senderId === user?._id ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}>
//                                     {msg.message}
//                                 </div>
//                             </div>
//                         )
//                     })
//                 }
//             </div>
//         </div>  
//     )
// }

// export default Messages;


// import React from 'react'
// import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
// import { Button } from './ui/button'
// import { Link } from 'react-router-dom'
// import { useSelector } from 'react-redux'
// import useGetAllMessage from '@/hooks/useGetAllMessage'
// import useGetRTM from '@/hooks/useGetRTM'

// const Messages = ({ selectedUser }) => {
//     useGetRTM();
//     useGetAllMessage();
//     const {messages} = useSelector(store=>store.chat);
//     const {user} = useSelector(store=>store.auth);
//     return (    
//         <div className='overflow-y-auto flex-1 p-4'>
//             <div className='flex justify-center'>
//                 <div className='flex flex-col items-center justify-center'>
//                     <Avatar className="h-20 w-20">
//                         <AvatarImage src={selectedUser?.profilePicture} alt='profile' />
//                         <AvatarFallback className="bg-gray-300 text-gray-800 flex items-center justify-center font-bold text-xl">{selectedUser?.username.charAt(0).toUpperCase()}</AvatarFallback>
//                     </Avatar>
//                     <span>{selectedUser?.username}</span>
//                     <Link to={`/profile/${selectedUser?._id}`}><Button className="h-8 my-2" variant="secondary">View profile</Button></Link>
//                 </div>
//             </div>
//             <div className='flex flex-col gap-3'>
//                 {
//                    messages && messages.map((msg) => {
//                         return (
//                             <div key={msg._id} className={`flex ${msg.senderId === user?._id ? 'justify-end' : 'justify-start'}`}>
//                                 <div className={`p-2 rounded-lg max-w-xs wrap-break-words ${msg.senderId === user?._id ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}>
//                                     {msg.message}
//                                 </div>
//                             </div>
//                         )
//                     })
//                 }

//             </div>
//         </div>  
//     )
// }

// export default Messages

// import React from 'react'
// import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
// import { Button } from './ui/button'
// import { Link } from 'react-router-dom'
// import { useSelector } from 'react-redux'
// import useGetAllMessage from '@/hooks/useGetAllMessage'
// import useGetRTM from '@/hooks/useGetRTM'

// const Messages = ({ selectedUser }) => {
//     useGetAllMessage();
//     useGetRTM();



//     const { messages } = useSelector(store => store.chat);
//     const { user } = useSelector(store => store.auth);

//     return (
//         <div className='overflow-y-auto flex-1 p-4'>
//             <div className='flex justify-center'>
//                 <div className='flex flex-col items-center justify-center'>
//                     <Avatar className="h-20 w-20">
//                         <AvatarImage src={selectedUser?.profilePicture} alt='profile' />
//                         <AvatarFallback className="bg-gray-300 text-gray-800 flex items-center justify-center font-bold text-xl">
//                             {selectedUser?.username.charAt(0).toUpperCase()}
//                         </AvatarFallback>
//                     </Avatar>
//                     <span>{selectedUser?.username}</span>
//                     <Link to={`/profile/${selectedUser?._id}`}>
//                         <Button className="h-8 my-2" variant="secondary">View profile</Button>
//                     </Link>
//                 </div>
//             </div>
//             <div className='flex flex-col gap-3'>
//                 {
//                     messages && messages.map((msg) => {
//                         return (
//                             <div key={msg._id} className={`flex ${msg.senderId === user?._id ? 'justify-start' : 'justify-end'}`}>
//                                 <div className={`p-2 rounded-lg max-w-xs wrap-break-words ${msg.senderId === user?._id ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}>
//                                     {msg.message}
//                                 </div>
//                                 {/* The Timestamp */}
//                                 <span className={`text-[10px] self-end mt-1 ${isSender ? 'text-blue-100' : 'text-gray-500'}`}>
//                                     {formatLocalTime(msg.createdAt)}
//                                 </span>
//                             </div>
//                         )
//                     })
//                 }
//             </div>
//         </div>
//     )
// }


// // A simple helper to format the date
// const formatLocalTime = (dateString) => {
//     if (!dateString) return "";
//     const date = new Date(dateString);
//     // This automatically converts to the user's local timezone!
//     return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
// };

// export default Messages;



// import React from 'react'
// import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
// import { Button } from './ui/button'
// import { Link } from 'react-router-dom'
// import { useSelector } from 'react-redux'
// import useGetAllMessage from '@/hooks/useGetAllMessage'
// import useGetRTM from '@/hooks/useGetRTM'
// import { decryptMessage, importSymmetricKey, decryptFile } from "@/utils/crypto.js";

// // A simple helper to format the date
// const formatLocalTime = (dateString) => {
//     if (!dateString) return "";
//     const date = new Date(dateString);
//     return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
// };

// const Messages = ({ selectedUser }) => {
//     useGetAllMessage();
//     useGetRTM();

//     const { messages } = useSelector(store => store.chat);
//     const { user } = useSelector(store => store.auth);

//     return (
//         <div className='overflow-y-auto flex-1 p-4'>
//             <div className='flex justify-center'>
//                 <div className='flex flex-col items-center justify-center'>
//                     <Avatar className="h-20 w-20">
//                         <AvatarImage src={selectedUser?.profilePicture} alt='profile' />
//                         <AvatarFallback className="bg-gray-300 text-gray-800 flex items-center justify-center font-bold text-xl">
//                             {selectedUser?.username?.charAt(0)?.toUpperCase() || '?'}
//                         </AvatarFallback>
//                     </Avatar>
//                     <span>{selectedUser?.username}</span>
//                     <Link to={`/profile/${selectedUser?._id}`}>
//                         <Button className="h-8 my-2" variant="secondary">View profile</Button>
//                     </Link>
//                 </div>
//             </div>
//             <div className='flex flex-col gap-3'>
//                 {
//                     messages && messages.map((msg) => {
//                         // 1. DEFINE isSender HERE
//                         const isSender = msg.senderId === user?._id; 
                        
//                         return (
//                             // 2. Fixed alignment: justify-end for sender, justify-start for receiver
//                             <div key={msg._id} className={`flex ${isSender ? 'justify-end' : 'justify-start'}`}>
                                
//                                 {/* 3. Fixed typo: break-words, and added flex-col so time sits under text */}
//                                 <div className={`p-2 rounded-lg max-w-xs break-words flex flex-col ${isSender ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}>
                                    
//                                     <span>{msg.message}</span>
                                    
//                                     {/* 4. Timestamp is now INSIDE the colored bubble */}
//                                     <span className={`text-[10px] self-end mt-1 ${isSender ? 'text-blue-100' : 'text-gray-500'}`}>
//                                         {formatLocalTime(msg.createdAt)}
//                                     </span>
                                    
//                                 </div>
//                             </div>
//                         )
//                     })
//                 }
//             </div>
//         </div>
//     )
// }

// export default Messages;






import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import useGetAllMessage from '@/hooks/useGetAllMessage'
import useGetRTM from '@/hooks/useGetRTM'

// A simple helper to format the date
const formatLocalTime = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

const Messages = ({ selectedUser }) => {
    useGetAllMessage();
    useGetRTM();

    const { messages } = useSelector(store => store.chat);
    const { user } = useSelector(store => store.auth);

    return (
        <div className='overflow-y-auto flex-1 p-4'>
            <div className='flex justify-center'>
                <div className='flex flex-col items-center justify-center'>
                    <Avatar className="h-20 w-20">
                        <AvatarImage src={selectedUser?.profilePicture} alt='profile' />
                        <AvatarFallback className="bg-gray-300 text-gray-800 flex items-center justify-center font-bold text-xl">
                            {selectedUser?.username?.charAt(0)?.toUpperCase() || '?'}
                        </AvatarFallback>
                    </Avatar>
                    <span>{selectedUser?.username}</span>
                    <Link to={`/profile/${selectedUser?._id}`}>
                        <Button className="h-8 my-2" variant="secondary">View profile</Button>
                    </Link>
                </div>
            </div>
            <div className='flex flex-col gap-3'>
                {
                    messages && messages.map((msg) => {
                        const isSender = msg.senderId === user?._id; 
                        
                        return (
                            <div key={msg._id} className={`flex ${isSender ? 'justify-end' : 'justify-start'}`}>
                                
                                <div className={`p-2 rounded-lg max-w-xs break-words flex flex-col ${isSender ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}>
                                    
                                    {/* 1. Render the decrypted image if it exists */}
                                    {msg.imageUrl && (
                                        <img 
                                            src={msg.imageUrl} 
                                            alt="Encrypted media" 
                                            className="rounded-md mb-2 max-w-full h-auto object-cover" 
                                        />
                                    )}

                                    {/* 2. Render the text message if it exists */}
                                    {msg.message && <span>{msg.message}</span>}
                                    
                                    {/* 3. Render the Timestamp */}
                                    <span className={`text-[10px] self-end mt-1 ${isSender ? 'text-blue-100' : 'text-gray-500'}`}>
                                        {formatLocalTime(msg.createdAt)}
                                    </span>
                                    
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Messages;