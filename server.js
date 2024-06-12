import express from 'express';
import bodyParser from 'body-parser';
import { MongoClient } from 'mongodb';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

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
        console.error('Error connecting to database:', error);
    }
}
connectToDatabase();

// Handle form submission
app.post('/submit-comment', async (req, res) => {
    const formData = req.body;
    console.log('Received form data:', formData); // Log received data

    try {
        const database = client.db('terpPlates'); // Replace with your database name
        const collection = database.collection('251UserComments'); // Replace with your collection name
        const result = await collection.insertOne(formData);
        console.log('Insert result:', result); // Log insert result
        res.send('Form data submitted successfully');
    } catch (error) {
        console.error('Error inserting form data:', error);
        res.status(500).send('Error submitting form data');
    }
});

// Serve your HTML file
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/official-website/251-portal-251create-review/251cmnts.html'));
});

// Route to fetch and display comments
app.get('/comments', async (req, res) => {
    try {
        const database = client.db('terpPlates'); // Replace with your database name
        const collection = database.collection('251UserComments'); // Replace with your collection name
        const comments = await collection.find().toArray();
        res.json(comments);
    } catch (error) {
        console.error('Error fetching comments:', error);
        res.status(500).send('Error fetching comments');
    }
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on http://localhost:${port}`);
});
