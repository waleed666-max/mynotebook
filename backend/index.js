const path = require('path');

// ✅ Explicitly load .env from backend folder
require('dotenv').config({ path: path.join(__dirname, '.env') });

const express = require('express');
const cors = require('cors');
const connectToMongo = require('./db');

const app = express();
const port = process.env.PORT || 5000;

// Debug log (check if MONGO_URI is loaded)
if (!process.env.MONGO_URI) {
  console.error('❌ ERROR: MONGO_URI not found in environment variables!');
  console.error('📁 Looking for .env at:', path.join(__dirname, '.env'));
  process.exit(1);
}

// ✅ CORS fix for mobile
app.use(cors({
  origin: '*',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'auth-token']
}));

app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

// Connect to MongoDB and start server
const startServer = async () => {
  await connectToMongo();
  
  app.listen(port, () => {
    console.log(`✅ iNotebook backend listening on port ${port}`);
  });
};

startServer();