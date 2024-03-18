// Importing required modules and packages
import express from 'express';
import * as dotenv from 'dotenv';
import OpenAI from 'openai';

// Configuring environment variables
dotenv.config();

// Creating an Express router
const router = express.Router();

// Creating an instance of the OpenAI class with the provided API key
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})

// Handling GET requests to the root endpoint
router.route('/').get(async (req, res) => {
    res.send('Hello World!');
})

// Handling POST requests to the root endpoint
router.route('/').post(async (req, res) => {
    try {
        // Extracting the 'prompt' from the request body
        const { prompt } = req.body;

        // Generating an image using the OpenAI GPT-3.5 engine
        const aiResponse = await openai.images.generate({
            prompt,
            n: 1,
            size: '1024x1024',
            response_format: 'b64_json'
        })

        // Extracting the generated image data in base64 format
        const image = aiResponse.data[0].b64_json;

        // Sending the generated image as a JSON response
        res.status(200).json({ photo: image })
    } catch(error) {
        // Handling errors that may occur during image generation
        console.log(error);
        res.status(500).send(error?.response.data.error.message);
    }
})

// Exporting the router for use in other parts of the application
export default router;
