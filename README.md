# P2P FileSharing Hub

A professional, high-performance **Peer-to-Peer (P2P)** file sharing application. It enables seamless file transfers directly between students and allows administrators to broadcast files to all connected clients in real-time using **WebRTC** and **Socket.io**.

---

## Key Features

### Student Features
- **Direct P2P Transfer**: Share files directly with other online students using WebRTC.
- **Secure Authentication**: Robust sign-up and login system powered by **JWT**.
- **Real-time Status**: View a live list of currently online users.
- **Privacy First**: Files are transferred directly between peers, reducing server load and increasing privacy.

### Admin Features
- **Admin Dashboard**: Manage the entire sharing environment from a dedicated panel.
- **Broadcast Transfers**: Send files to every active user simultaneously.
- **Traffic Monitoring**: Track transfers and active sessions in real-time.

---

## Tech Stack

### Frontend
- **React.js**: Modern, component-based user interface.
- **Tailwind CSS**: Sleek and professional styling.
- **Framer Motion**: Smooth micro-animations for an enhanced UX.
- **Socket.io Client**: Real-time communication and signaling.

### Backend
- **Node.js & Express**: Fast and scalable server architecture.
- **MongoDB**: For user management and role-based access control.
- **Socket.io**: WebRTC signaling and real-time event handling.
- **WebRTC**: Peer-to-peer data channel implementation for file sharing.

---

## Demo Screenshots

## Frontend

<img width="899" height="497" alt="image" src="https://github.com/user-attachments/assets/da50cd62-7309-41a0-8ced-c1893fa95dd9" />

<img width="877" height="417" alt="image" src="https://github.com/user-attachments/assets/c08f97dc-e562-4896-b32c-938c9c4184f2" />

<img width="829" height="395" alt="image" src="https://github.com/user-attachments/assets/7ddc9e23-5a1f-4eca-a318-ef3eef28a4f2" />

<img width="808" height="383" alt="image" src="https://github.com/user-attachments/assets/d5a3d88a-a69b-4b39-8a06-698d6d2a73de" />

## Login pages
<img width="841" height="385" alt="image" src="https://github.com/user-attachments/assets/b1328ad3-193e-4420-8193-22c4d15b8534" />

<img width="862" height="399" alt="image" src="https://github.com/user-attachments/assets/97871077-b8cc-43f2-bb24-8166392fff48" />

## Student Dashboard

<img width="845" height="413" alt="image" src="https://github.com/user-attachments/assets/c12d75a8-77ab-4d05-acef-b556ad47b844" />

<img width="852" height="441" alt="image" src="https://github.com/user-attachments/assets/66185ed2-16dd-4dfa-8fc8-4100cd9c0e1b" />

<img width="849" height="393" alt="image" src="https://github.com/user-attachments/assets/82aa9ff1-fb3d-4780-be25-9cec98045714" />

<img width="827" height="383" alt="image" src="https://github.com/user-attachments/assets/1306f551-b735-4fd1-87cb-d3a1f82d5145" />

## Admin Dashboard

<img width="874" height="405" alt="image" src="https://github.com/user-attachments/assets/22e01b87-5ca8-4a6a-9d27-1109ccd11b54" />

<img width="780" height="359" alt="image" src="https://github.com/user-attachments/assets/67b6fbd6-4f78-49a9-9b1e-63cfb07aadc1" />

<img width="817" height="389" alt="image" src="https://github.com/user-attachments/assets/56ccb358-751d-41cf-9c61-1d08e4b9ee64" />

<img width="848" height="382" alt="image" src="https://github.com/user-attachments/assets/6dee1222-95e2-40e3-ac9c-e42b8a506c5f" />

<img width="870" height="403" alt="image" src="https://github.com/user-attachments/assets/41b54437-ea58-4bdb-ac4c-aead8f1893c2" />

---

## Installation & Setup

### Prerequisites
- [Node.js](https://nodejs.org/) (v16.x or higher)
- [MongoDB](https://www.mongodb.com/try/download/community) (Running locally or a Cloud instance)

### Step 1: Clone the Repository
```bash
git clone https://github.com/omsatardekar/P2P-Filesharing-Hub.git
cd P2P-Filesharing-Hub
```

### Step 2: Backend Setup
1. Navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   npm run dev
   ```
   *The server will be running on `http://localhost:5000`.*

### Step 3: Frontend Setup
1. Open a new terminal and navigate to the frontend folder:
   ```bash
   cd frontend-react
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the application:
   ```bash
   npm start
   ```
   *The app will open automatically on `http://localhost:3000`.*

---

## Contact & Support

For any queries, suggestions, or issues, experimental features, or collaborations, feel free to reach out:

**Email**: [omkarsatardekar4002@gmail.com](mailto:omkarsatardekar4002@gmail.com)

---

## License
This project is licensed under the MIT License. Feel free to use and modify it for your own learning or professional needs.

---
*Created with ❤️ by Om Satardekar*
