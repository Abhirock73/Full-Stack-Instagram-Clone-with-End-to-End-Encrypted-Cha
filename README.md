# 📸 Full-Stack Instagram Clone with End-to-End Encrypted Chat

A production-inspired **Instagram Clone** built using the **MERN Stack** that combines modern social media functionality with secure real-time communication. The application supports **end-to-end encrypted text and image messaging** using **RSA-AES hybrid encryption**, ensuring that only intended recipients can decrypt conversations while the server stores only encrypted ciphertext.

---

## ✨ Features

- 🔐 End-to-End Encrypted Chat (RSA + AES Hybrid Encryption)
- 💬 Real-time Messaging with Socket.IO
- 🖼️ Encrypted Image Sharing
- ❤️ Like & Comment on Posts
- 👥 Follow / Unfollow Users
- 📝 Create & Delete Posts
- 👤 User Profiles
- 🔔 Real-time Notifications
- 🔑 JWT Authentication & Protected Routes
- 🔒 bcrypt Password Hashing
- ⚡ Redux Toolkit for State Management
- 📱 Responsive UI with Tailwind CSS

---

## 🛠️ Tech Stack

### Frontend

- React.js
- Redux Toolkit
- Tailwind CSS
- Socket.IO Client

### Backend

- Node.js
- Express.js
- MongoDB
- Socket.IO
- JWT Authentication
- bcrypt

### Security

- RSA Public-Key Cryptography
- AES Symmetric Encryption
- Hybrid Encryption
- PKI-style Public Key Management

---

## 🔒 Security Highlights

- End-to-end encryption for both **text** and **image** messages
- Client-side encryption and recipient-side decryption
- Server stores only encrypted ciphertext
- JWT-based authentication and protected APIs
- Secure password hashing using bcrypt