// import { createSlice } from "@reduxjs/toolkit";
// import { setMessageNotification } from "./rtnSlice";

// const chatSlice = createSlice({
//     name:"chat",
//     initialState:{
//         onlineUsers:[],
//         messages:[],
//         messageNotification:[],
//     },
//     reducers:{
//         // actions
//         setOnlineUsers:(state,action) => {
//             state.onlineUsers = action.payload;
//         },
//         setMessages:(state,action) => {
//             state.messages = [...state.messages, action.payload];
//         },

//     }
// });
// export const {setOnlineUsers, setMessages, setMessageNotification} = chatSlice.actions;
// export default chatSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
    name: "chat",
    initialState: {
        onlineUsers: [],
        messages: [],

    },
    reducers: {
        setOnlineUsers: (state, action) => {
            state.onlineUsers = action.payload;
        },
        // FIXED: Replaces the entire array rather than nesting arrays inside arrays
        setMessages: (state, action) => {
            state.messages = action.payload; 
        },

    }
});

export const { setOnlineUsers, setMessages } = chatSlice.actions;
export default chatSlice.reducer;