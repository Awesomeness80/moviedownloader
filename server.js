const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

// Map your 5-digit codes to your direct download links
const codeDatabase = {
    "32784": "https://drive.google.com/file/d/15x2QA7OignknD0LD086nsUiGpil3VSWN/view?usp=sharing",
    "98765": "https://drive.google.com/uc?export=download&id=ANOTHER_FILE_ID_HERE"
};

app.get('/api/download', (req, res) => {
    const code = req.query.code;
    const fileUrl = codeDatabase[code];

    if (fileUrl) {
        // Send the URL back as JSON instead of trying to force a server redirect
        res.json({ url: fileUrl });
    } else {
        res.status(400).json({ message: "Invalid or expired 5-digit code." });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
