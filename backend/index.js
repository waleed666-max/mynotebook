const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const express = require('express');
const cors = require('cors');
const connectToMongo = require('./db');

const app = express();
const port = process.env.PORT || 5000;

if (!process.env.MONGO_URI) {
  console.error('❌ ERROR: MONGO_URI not found!');
  process.exit(1);
}

app.use(cors({
  origin: '*',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'auth-token']
}));

app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'iNotebook Backend Running!' });
});

// API Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

const startServer = async () => {
  await connectToMongo();
  app.listen(port, () => {
    console.log(`✅ Backend listening on port ${port}`);
  });
};

const path = require('path');

// Serve React build (production)
app.use(express.static(path.join(__dirname, '../frontend/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});


// ---------- END OF ADDITION ----------


startServer();