// Importing required modules and packages
import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';

// Importing database connection function
import connectDB from './mongodb/connect.js';

// Importing route handlers
import postRoutes from './routes/postRoutes.js';
import daleRoutes from './routes/daleRoutes.js';

// Configuring environment variables
dotenv.config();

// Creating an Express application
const app = express();

// Enabling Cross-Origin Resource Sharing (CORS) for handling HTTP requests from different origins
app.use(cors());

// Parsing incoming JSON requests with a limit of 50mb
app.use(express.json({ limit: '50mb' }));

// Defining routes for post-related and dale-related functionality
app.use('/api/v1/posts', postRoutes);
app.use('/api/v1/dale', daleRoutes);

// Default route to handle root endpoint
app.get('/', async (req, res) => {
    res.send('Hello World!');
});

// Function to start the server
const startServer = async () => {
    try {
        // Connecting to the MongoDB database using the provided URL
        connectDB(process.env.MONGO_URL);

        // Starting the Express server on port 8080
        app.listen(8080, () => {
            console.log('Server is listening on port 8080');
        });
    } catch (err) {
        // Handling any errors that occur during server startup
        console.log(err);
    }
};

// Calling the function to start the server
startServer();
