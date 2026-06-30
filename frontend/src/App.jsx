import { useEffect } from 'react'
import ChatPage from './components/ChatPage'
import EditProfile from './components/EditProfile'
import Home from './components/Home'
import Search from './components/Search'
import Login from './components/Login'
import MainLayout from './components/MainLayout'
import Profile from './components/Profile'
import Signup from './components/Signup'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { io } from "socket.io-client";
import { useDispatch, useSelector } from 'react-redux'
import { setSocket } from './redux/socketSlice'
import { setOnlineUsers } from './redux/chatSlice'
import { setLikeNotification, setMessageNotification } from './redux/rtnSlice'
import ProtectedRoutes from './components/ProtectedRoutes'

import useInitializeKeys from './services/initializeKeys.js'
import { fetchPublicKey } from "./services/keyService.js";
import { importPublicKey } from "./utils/crypto.js";



const browserRouter = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoutes><MainLayout /></ProtectedRoutes>,
    children: [
      {
        path: '/',
        element: <ProtectedRoutes><Home /></ProtectedRoutes>
      },
      {
        path: '/profile/:id',
        element: <ProtectedRoutes> <Profile /></ProtectedRoutes>
      },
      {
        path: '/account/edit',
        element: <ProtectedRoutes><EditProfile /></ProtectedRoutes>
      },
      {
        path: '/chat',
        element: <ProtectedRoutes><ChatPage /></ProtectedRoutes>
      },
      {
        path: '/search',
        element: <ProtectedRoutes><Search /></ProtectedRoutes>
      }
    ]
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signup',
    element: <Signup />
  },
])

function App() {
  const initializeKeys = useInitializeKeys();
  const { user } = useSelector(store => store.auth);
  const { socket } = useSelector(store => store.socketio);
  const dispatch = useDispatch();

  useEffect(() => {

    if (user) {

      (
        async () => {
          try {
            const publicKey = await fetchPublicKey(user._id);


            if (publicKey) {
              const importedPublicKey = await importPublicKey(publicKey);
              console.log("Imported public key:", importedPublicKey);
            } else {
              console.log("No public key found for the user.");
            }
          } catch (error) {
            console.error("Error fetching or importing public key:", error);
          }
        }
      )();

      (async () => {
        try {
          await initializeKeys();
        } catch (err) {
          console.error("REAL ERROR:", err);
        }
      })();
      const socketio = io('http://localhost:4000', {
        query: {
          userId: user?._id
        },
        transports: ['websocket']
      });
      dispatch(setSocket(socketio));

      // listen all the events
      socketio.on('getOnlineUsers', (onlineUsers) => {
        dispatch(setOnlineUsers(onlineUsers));
      });

      socketio.on('notification', (notification) => {
        dispatch(setLikeNotification(notification));
      });
      socketio.on('newMessage', (newMessage) => {
        dispatch(setMessageNotification());
      });


      return () => {
        socketio.close();
        dispatch(setSocket(null));
      }
    } else if (socket) {
      socket.close();
      dispatch(setSocket(null));
    }
  }, [user, dispatch]);

  return (
    <>
      <RouterProvider router={browserRouter} />
    </>
  )
}

export default App
