const mongoose = require('mongoose');

//for local use
//const mongoURI = 'mongodb://127.0.0.1:27017/inotebook';


const mongoURI = 'mongodb+srv://waleedakhtar_db_user:waleed123@inotebook.u8reyco.mongodb.net/?appName=inotebook';

const connectToMongo = () => {
  mongoose.connect(mongoURI)
    .then(() => {
      console.log("Connected to MongoDB successfully");
    })
    .catch((err) => {
      console.error("MongoDB connection error:", err);
    });
};

module.exports = connectToMongo; // ✅ SAME NAME
