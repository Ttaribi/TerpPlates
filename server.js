const mongodb = require('mongodb');

const client = new mongodb.MongoClient('your_mongodb_connection_string', { useUnifiedTopology: true });

client.connect(err => {
  if (err) {
    console.error('Failed to connect to MongoDB', err);
    return;
  }
  const db = client.db('your_database_name');
  console.log('Connected to MongoDB');
  
  // You can now use `db` to interact with your MongoDB database
});

process.on('SIGINT', () => {
  client.close();
  process.exit();
});