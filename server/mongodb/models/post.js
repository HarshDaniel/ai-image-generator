// Importing Mongoose for MongoDB interaction
import mongoose from "mongoose";

// Defining the structure of the Post schema
const Post = new mongoose.Schema({
    // Name of the post, a required string field
    name: { type: String, required: true },

    // Prompt associated with the post, a required string field
    prompt: { type: String, required: true },

    // URL or path to the photo associated with the post, a required string field
    photo: { type: String, required: true },
})

// Creating a Mongoose model based on the defined schema
const PostSchema = mongoose.model("Post", Post);

// Exporting the Post model for use in other parts of the application
export default PostSchema;
