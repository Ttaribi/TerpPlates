// api/submit.js
const MongoClient = require('mongodb').MongoClient;

module.exports = async (req, res) => {
  const uri = process.env.MONGODB_URI;
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();

    const commentData = req.body;
    const result = await client.db("terpPlates").collection("251UserComments").insertOne(commentData);

    res.status(200).send('Comment saved');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error saving comment');
  } finally {
    await client.close();
  }
};