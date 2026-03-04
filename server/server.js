const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const teamRoutes = require('./routes/teamRoutes');
const taskRoutes = require('./routes/taskRoutes');
const http = require("http");
const { Server } = require("socket.io");

dotenv.config(); // Load environment variables FIRST

const app = express();
const server = http.createServer(app);

// Socket.io setup (only once!)
const io = new Server(server, { 
  cors: { 
    origin: "*",           // ← Change to your Vercel URL later for better security, e.g. "https://your-frontend.vercel.app"
    methods: ["GET", "POST"],
    credentials: true
  } 
});

const port = process.env.PORT || 4400;

// Middleware
app.use(cors({
  origin: "*",           // ← Same note: tighten this later
  credentials: true
}));
app.use(express.json({ limit: "5mb" })); 
app.use(express.urlencoded({ limit: "5mb", extended: true }));

console.log('MongoDB URI:', process.env.URI ? 'Set ✓' : 'Missing!');
console.log('CLOUDINARY_API_KEY:', process.env.CLOUDINARY_API_KEY ? 'Set ✓' : 'Missing!');

// MongoDB Atlas connection
const mongoURI = process.env.URI;

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('Connected to MongoDB');
    // If you have socket.io initialization that depends on DB, put it here
    // Example: require('./socket')(io);  ← if you have a separate socket file
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });

// Routes
app.use('/auth', authRoutes);
app.use('/team', teamRoutes);
app.use('/task', taskRoutes);

// Important: If you have socket.io event handlers, add them here (AFTER io is created)
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);
  
  // ← Add your existing socket events here, e.g.:
  // socket.on('taskUpdated', (data) => { ... });
  // socket.on('whiteboardDraw', (data) => { ... io.emit('whiteboardUpdate', data); });
  
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Start the server
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});