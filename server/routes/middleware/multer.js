// middleware/multer.js
const multer = require('multer');
const path = require('path');

// Define storage options
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../../uploads')); // Ensure this path exists
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    },
});

// Set up multer with storage configuration
const upload = multer({ storage });

module.exports = upload;
