// routes/upload.js
const express = require('express');
const router = express.Router();
const upload = require('./middleware/multer'); // Import multer setup

// Upload route to handle file uploads
router.post('/upload', upload.single('file'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        // Respond with the file path or any other required details
        res.status(200).json({ filePath: req.file.path, fileName: req.file.filename });
    } catch (error) {
        console.error('Error uploading file:', error);
        res.status(500).json({ error: 'Failed to upload file' });
    }
});

module.exports = router;
