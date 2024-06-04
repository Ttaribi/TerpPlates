// api/getComments.js
const MongoClient = require('mongodb').MongoClient;


module.exports = async (req, res) => {
  const uri = process.env.MONGODB_URI;
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();

    const comments = await client.db("terpPlates").collection("251UserComments").find().toArray();

    res.status(200).json(comments);
  } catch (error) {

    console.error(error);
    res.status(500).send('Error retrieving comments');
  } finally {
    await client.close();
  }
};
