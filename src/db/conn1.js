const { MongoClient } = require('mongodb');

const mongoURI = 'mongodb://localhost:27017'; // Replace with your MongoDB server URI
const dbName = 'quizApp'; // Replace with your database name
const collectionName = 'userData'; // Replace with your collection name for user data

async function updateUserData(userData) {
  let client;

  try {
    client = new MongoClient(mongoURI, { useUnifiedTopology: true });
    await client.connect();
    const db = client.db(dbName);

    // Create a new collection (if it doesn't exist) for storing user data
    const userCollection = db.collection(collectionName);

    // Check if a user with the same userName exists in the collection
    const existingUser = await userCollection.findOne({ userName: userData.userName });

    if (existingUser) {
      // If the user exists, update their data
      const result = await userCollection.updateOne(
        { userName: userData.userName },
        {
          $set: {
            correctAnswers: userData.correctAnswers,
            wrongAnswers: userData.wrongAnswers,
            unattempted: userData.unattempted,
          },
        }
      );

      console.log(`Updated user data for ${userData.userName}. Data sent successfully.`);
    } else {
      // If the user doesn't exist, insert their data
      const result = await userCollection.insertOne(userData);

      console.log(`Inserted user data for ${userData.userName}. Data sent successfully.`);
    }
  } catch (err) {
    console.error('Error:', err);
  } finally {
    if (client) {
      client.close();
    }
  }
}

// Example user data for a single user after test completion
const userData = {
  userName: 'User1',
  correctAnswers: 7,
  wrongAnswers: 3,
  unattempted: 0,
};

// Call the function to insert or update user data for the user after test completion
updateUserData(userData);
