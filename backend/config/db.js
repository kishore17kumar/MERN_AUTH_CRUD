const mongoose = require('mongoose');

const connectDb = async () => {
    try {
        const conn = await mongoose.connect('mongodb://localhost:27017/mernproject');
        console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
    } catch (error) {
        console.error(`Error: ${error.message}`.red.underline.bold);
        process.exit(1);
    }
};

module.exports = connectDb;
