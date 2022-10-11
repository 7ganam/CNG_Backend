const mongoose = require('mongoose');


const connectDB = async () => {


    if (!process.env.MONGO_URI) {
        console.error('MongoDB connection string missing!')
        process.exit(1)
    }

    const conn = await mongoose.connect(process.env.MONGO_URI, {});

    console.log(`MongoDB Connected: ${conn.connection.host}`);

    const db = mongoose.connection
    db.on('error', err => {
        console.error('MongoDB error: ' + err.message);
        process.exit(1)
    })

    db.once('open', () => console.log(`MongoDB Connected: ${conn.connection.host}`))
};

module.exports = connectDB;
