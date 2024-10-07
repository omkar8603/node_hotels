
const mongoose = require('mongoose');
require('dotenv').config();

//Define the mongoDB Connection URL
//  const mongoURl = process.env.MONGODB_URL_LOCAL  // Replace 'mydatabase' with your database name
// const mongoURl = 'mongodb+srv://omkarmane8603:Mongo123@cluster0.yza61.mongodb.net/'
   const mongoURl = process.env.MONGODB_URL;
// mongodb+srv://omkarmane8603:<db_password>@cluster0.yza61.mongodb.net/

const db = async()=>{
    await mongoose.connect(mongoURl)
    console.log("db connect");
}


//set up MongoDB connection
// mongoose.connect(mongoURl, {
//     useNewUrlParser: true,
//   useUnifiedTopology: true,
//   //ssl: false // Disables SSL
// })

// // get the default connection
// // Mongoose maintaines a default connection object representing the MongoDB connection
// const db = mongoose.connection;

// db.on('connected',() => {
//     console.log('Connected to MongoDB server');
// })

// db.on('error',(err) => {
//     console.log('MongoDb connection error:' , err);
// })

// db.on('disconnected',() => {
//     console.log('MongoDB disconnected');
// })


// Handling the process termination or interrupt signals
// process.on('SIGINT', async () => {
//     await mongoose.connection.close();
//     console.log('MongoDB disconnected due to app termination');
//     process.exit(0);
// });


// // Export the database connection

module.exports = db;


