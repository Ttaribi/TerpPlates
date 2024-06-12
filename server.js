const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');

const app = express();
const port = 3000; // Change to your desired port

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// MongoDB connection URI
const uri = 'mongodb+srv://mtaribi18:Yewaboma4!@tmt.r7y7civ.mongodb.net/'; // Replace with your MongoDB URI
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Connect to MongoDB
async function connectToDatabase() {
    try {
        await client.connect();
        console.log('Connected to database');
    } catch (error) {
        console.error(error);
    }
}
connectToDatabase();

// Handle form submission
app.post('/submit-comment', async (req, res) => {
    const formData = req.body;

    try {
        const database = client.db('terpPlates'); // Replace with your database name
        const collection = database.collection('251UserComments'); // Replace with your collection name
        await collection.insertOne(formData);
        res.send('Form data submitted successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error submitting form data');
    }
});

// Serve your HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/official-website/251-portal-251create-review/251cmnts.html'));
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
