// Importing required modules and packages
import express from 'express';
import * as dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';

// Importing the Post model from the MongoDB models
import Post from '../mongodb/models/post.js';

// Configuring environment variables
dotenv.config();

// Creating an Express router
const router = express.Router();

// Configuring Cloudinary with API credentials
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Handling GET requests to the root endpoint
router.route('/').get(async (req, res) => {
    try {
        // Fetching all posts from the MongoDB database
        const posts = await Post.find({});

        // Sending a successful response with the fetched posts
        res.status(200).json({ success: true, data: posts });
    } catch(error) {
        // Handling errors that may occur during the database query
        res.status(500).json({ success: false, message: error });
    }
})

// Handling POST requests to the root endpoint
router.route('/').post(async (req, res) => {
    try {
        // Extracting relevant data from the request body
        const { name, prompt, photo } = req.body;

        // Uploading the photo to Cloudinary and obtaining the URL
        const photoUrl = await cloudinary.uploader.upload(photo);

        // Creating a new post in the MongoDB database
        const newPost = await Post.create({
            name,
            prompt,
            photo: photoUrl.url,
        })

        // Sending a successful response with the created post data
        res.status(201).json({ success: true, data: newPost });
    } catch (error) {
        // Handling errors that may occur during post creation
        res.status(500).json({ success: false, message: error });
    }
});

// Exporting the router for use in other parts of the application
export default router;
