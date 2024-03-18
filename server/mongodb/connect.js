// Importing the Mongoose library for MongoDB interaction
import mongoose from 'mongoose';

// Defining a function to connect to the MongoDB database
const connectDB = async (url) => {
    // Setting the 'strictQuery' option to true (optional)
    mongoose.set('strictQuery', true);

    // Attempting to connect to the MongoDB database using the provided URL
    mongoose.connect(url)
        .then(() => console.log('MongoDB connected...'))
        .catch(err => console.log(err));
}

// Exporting the connectDB function for use in other parts of the application
export default connectDB;
