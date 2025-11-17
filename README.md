# MERN Blog — Full working starter

This archive contains a full working MERN blog starter scaffold (server + client).
Follow the instructions in server/ and client/ folders to install dependencies and run locally.

## Quick start

1. Start MongoDB locally (or set MONGO_URI in server/.env to a working MongoDB URI).
2. Install server deps:
   cd server
   npm install
3. Install client deps:
   cd client
   npm install
4. Create .env files by copying .env.example in each folder and adjusting values.
5. Start server (from server/):
   npm run dev
6. Start client (from client/):
   npm run dev

This scaffold includes:
- Express API with posts & categories endpoints
- Mongoose models, validation, and error handling
- React (Vite) front-end with context, routing, API service, and basic components
