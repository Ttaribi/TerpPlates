import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import submitHandler from './submit.js';

const app = express();
dotenv.config();
app.use(express.json()); // Middleware to parse JSON bodies

const PORT = process.env.PORT || 8001; // Change to the new port
const MONGOURL = process.env.MONGO_URL;

mongoose.connect(MONGOURL).then(() => {
    console.log('Database connected');
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((error) => console.log(error));

// Define your user schema and model
const userSchema = new mongoose.Schema({
    email: String,
    comment: String,
});

const UserModel = mongoose.model('UserComments', userSchema);

// Basic test route
app.get('/', (req, res) => {
    res.send('Server is working!');
});

// Route to get users
app.get('/getUsers', async (req, res) => {
    const userData = await UserModel.find();
    res.json(userData);
});

// Route to handle comment submission
app.post('/api/submit', submitHandler);
