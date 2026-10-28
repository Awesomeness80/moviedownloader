const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve your frontend HTML file
app.use(express.static(path.join(__dirname, 'public')));

// Example database of 5-digit codes and their direct download links
const codeDatabase = {
    "12345": "https://your-cloud-storage-link.com/file1.zip",
    "98765": "https://your-cloud-storage-link.com/file2.zip"
};

// API endpoint that checks the code
app.get('/api/download', (req, res) => {
    const code = req.query.code;
    const fileUrl = codeDatabase[code];

    if (fileUrl) {
        // Redirect the user to the file download link
        res.redirect(fileUrl);
    } else {
        res.status(400).json({ message: "Invalid or expired 5-digit code." });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
