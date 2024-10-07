
const mongoose = require('mongoose');


//Define the mongoDB Connection URL
const mongoURl = 'mongodb://localhost:27017/hotels'   // Replace 'mydatabase' with your database name

//set up MongoDB connection
mongoose.connect(mongoURl, {
    // useNewUrlParser : true,
    // useUnifiedTopology : true
})

// get the default connection
// Mongoose maintaines a default connection object representing the MongoDB connection
const db = mongoose.connection;

db.on('connected',() => {
    console.log('Connected to MongoDB server');
})

db.on('error',(err) => {
    console.log('MongoDb connection error:' , err);
})

db.on('disconnected',() => {
    console.log('MongoDB disconnected');
})


// Handling the process termination or interrupt signals
process.on('SIGINT', async () => {
    await mongoose.connection.close();
    console.log('MongoDB disconnected due to app termination');
    process.exit(0);
});


// Export the database connection

module.exports = db;


