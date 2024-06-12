const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// Middleware
app.use(bodyParser.json());

// MongoDB connection string (replace with your own)
const dbURI = 'mongodb+srv://mtaribi18:Yewaboma4!@tmt.r7y7civ.mongodb.net/';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log(err));

// Define a schema and model for the form data
const commentSchema = new mongoose.Schema({
  name: String,
  comment: String,
  date: { type: Date, default: Date.now }
});

const Comment = mongoose.model('Comment', commentSchema);

// Route to handle form submissions
app.post('/submit-comment', (req, res) => {
  const comment = new Comment(req.body);
  comment.save()
    .then(() => res.status(200).send('Comment saved'))
    .catch(err => res.status(400).send('Error saving comment: ' + err));
});

// Serve the HTML file from the correct path
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'official-website', '251diner-portal', '251create-review', '251cmnts.html'));
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
