import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGO_URL;
const client = new MongoClient(uri);

const submitHandler = async (req, res) => {
  try {
    await client.connect();

    const commentData = req.body;
    const result = await client.db('terpplate').collection('251UserComments').insertOne(commentData);
    console.log('Insert result:', result); // Log the result

    res.status(200).send('Comment saved');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error saving comment');
  } finally {
    await client.close();
  }
};

export default submitHandler;
