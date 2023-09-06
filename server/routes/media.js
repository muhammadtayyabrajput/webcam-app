const express = require('express');
const multer = require('multer');
const { uploadFile, getFileUrl } = require('../utils/storage');
const authMiddleware = require('../middleware/auth2');
const Media = require('../models/media');
const User = require('../models/user');

const router = express.Router();

// Configure multer storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

//get user profile
router.get('/profile', authMiddleware, async (req, res) => {
    try {
        const userMedia = await Media.find({ user: req.user.userId }); // Use req.user.userId
        const userInfo = await User.findById(req.user.userId).select('-password');
        res.json({ user: userInfo, media: userMedia });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user profile', error: error.message });
    }
});

router.post('/upload', authMiddleware, upload.single('file'), async (req, res) => { // Updated field name
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const user = req.user;
        const fileBuffer = req.file.buffer;

        // Generate a unique filename based on timestamp and user ID
        const filename = `media_${Date.now()}_${user.userId}.jpg`;

        await uploadFile(fileBuffer, filename);

        const mediaUrl = await getFileUrl(filename);

        const media = new Media({ user: user.userId, url: mediaUrl });
        await media.save();

        res.status(201).json({ message: 'Media uploaded successfully' });
    } catch (error) {
        console.error('Error uploading media:', error);
        res.status(500).json({ message: 'Error uploading media', error: error.message });
    }
});

// Fetch media
router.get('/media', authMiddleware, async (req, res) => {
    try {
        const userMedia = await Media.find({ user: req.user.userId });
        res.status(200).json({ media: userMedia });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user media', error: error.message });
    }
});


module.exports = router;
