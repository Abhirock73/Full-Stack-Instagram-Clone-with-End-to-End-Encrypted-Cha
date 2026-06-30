// import { createSlice } from "@reduxjs/toolkit";

// const rtnSlice = createSlice({
//     name: 'realTimeNotification',
//     initialState: {
//         likeNotification: [], // [1,2,3]
//         messageNotification: []
//     },
//     reducers: {
//         setLikeNotification: (state, action) => {
//             console.log("setLikeNotification action.payload", action.payload.type);
//             if (action.payload.type === 'like') {
//                 state.likeNotification.push(action.payload);
//             } else if (action.payload.type === 'dislike') {
//                 state.likeNotification = state.likeNotification.filter((item) => item.userId !== action.payload.userId);
//             }
//         },
//         clearNotifications: (state) => {
//             state.likeNotification = [];
//         },
//         setMessageNotification: (state, action) => {
//             console.log("setMessageNotification action.payload", action.payload);
//             console.log("setMessageNotification state.messageNotification", state.messageNotification);
//             console.log("setMessageNotification state.messageNotification.length", action.payload.type);
//             // if (action.payload.type === 'message') {
//                 state.messageNotification.push(action.payload);
//             // }
            
//         },
//         clearMessageNotifications: (state) => {
//             state.messageNotification = [];
//         }

//     }
// });
// export const { setLikeNotification, clearNotifications, setMessageNotification , clearMessageNotifications } = rtnSlice.actions;
// export default rtnSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const rtnSlice = createSlice({
    name: 'realTimeNotification',
    initialState: {
        likeNotification: [],
        messageNotification: 0,
    },
    reducers: {
        setLikeNotification: (state, action) => {
            if (action.payload.type === 'like') {
                state.likeNotification.push(action.payload);
            } else if (action.payload.type === 'dislike') {
                state.likeNotification = state.likeNotification.filter((item) => item.userId !== action.payload.userId);
            }
        },
        clearNotifications: (state) => {
            state.likeNotification = [];
        },
        setMessageNotification: (state, action) => {
            state.messageNotification += 1;
        },
        clearMessageNotifications: (state) => {
            state.messageNotification = 0;
        }
    }
});

export const { setLikeNotification, clearNotifications, setMessageNotification, clearMessageNotifications } = rtnSlice.actions;
export default rtnSlice.reducer;