const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const User = require('./models/user');
const authRoutes = require('./routes/auth');
const mediaRoutes = require('./routes/media');

const app = express();

// Middleware
// app.use(cors());
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  }));
  
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Use auth routes
app.use('/api/auth', authRoutes);
app.use('/api/media', mediaRoutes)

// MongoDB connection
const mongoURI = 'mongodb+srv://tayyab:tayyab@camcluster.k8g8aym.mongodb.net/?retryWrites=true&w=majority'; // Replace with your MongoDB URI
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log('MongoDB connected successfully')).catch(err => console.log(err));

app.get('/', (req, res) => res.send('Hello World!'));

app.get('/allusers', async (req, res) => {
    try {
        const allUsers = await User.find();
        res.json(allUsers);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error: error.message });
    }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
