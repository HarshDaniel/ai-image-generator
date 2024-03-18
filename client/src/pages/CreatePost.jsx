// Import necessary modules from React and custom modules
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { preview } from '../assets';
import { getRandomPrompt } from '../utils';
import { Loader } from '../components';
import { FormField } from '../components';

// Define the CreatePost component
const CreatePost = () => {
  // Initialize state variables using the useState hook
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    prompt: '',
    photo: '',
  });

  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form input
    if (form.prompt && form.photo) {
      setLoading(true);

      try {
        // Send a POST request to the server to create a new post
        const response = await fetch('http://localhost:8080/api/v1/posts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(form),
        });

        await response.json();
        navigate('/');
      } catch (error) {
        alert('Something went wrong');
        setLoading(false);
      }
    } else {
      alert('Please enter a prompt and generate an image');
    }
  };

  // Function to handle input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Function to handle "Surprise Me" button click
  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
  };

  // Function to generate an image based on the prompt
  const generateImage = async () => {
    if (form.prompt) {
      try {
        setGeneratingImg(true);
        // Send a POST request to the server to generate an image using DALE AI
        const response = await fetch('http://localhost:8080/api/v1/dale', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ prompt: form.prompt }),
        });

        const data = await response.json();
        // Update the form state with the generated image
        setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` });
      } catch (error) {
        alert('Something went wrong');
      } finally {
        setGeneratingImg(false);
      }
    } else {
      alert('Please enter a prompt');
    }
  };

  // JSX structure for the CreatePost component
  return (
    <section className='max-w-7xl mx-auto'>
      <div>
        <h1 className='font-extrabold text-[#222328] text-[32px]'>Create</h1>
        <p className='mt-2 text-[#666e75] text-[16px] max-w-[500px]'>
          Create imaginative and stunning pieces of art using DALE AI
        </p>
      </div>

      {/* Form for creating a new post */}
      <form className='mt-16 max-w-3xl' onSubmit={handleSubmit}>
        <div className='flex flex-col gap-5'>
          {/* FormField component for name input */}
          <FormField labelName="Your name" type='text' name='name' placeholder='Enter your name' value={form.name} handleChange={handleChange} />
          {/* FormField component for prompt input */}
          <FormField labelName="Prompt" type='text' name='prompt' placeholder='Generate an image' value={form.prompt} handleChange={handleChange} isSurprise handleSurpriseMe={handleSurpriseMe} />
          {/* Image preview container */}
          <div className='relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center'>
            {form.photo ? (
              <img src={form.photo} alt={form.prompt} className='w-full h-full object-contain' />
            ) : (
              <img src={preview} alt='preview' className='w-9/12 h-9/12 object-contain opacity-40' />
            )}

            {/* Loader for image generation */}
            {generatingImg && (
              <div className='absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg'>
                <Loader />
              </div>
            )}
          </div>
        </div>

        {/* Button to generate image */}
        <div className='mt-5 flex gap-5'>
          <button type='button' onClick={generateImage} className='text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center'>
            {generatingImg ? 'Generating...' : 'Generate Image'}
          </button>
        </div>

        {/* Information and submit button */}
        <div className='mt-10'>
          <p className='mt-2 text-[#666e75] text-[14px]'>Once you have created the image, you can share it with others</p>
          <button type='submit' className='mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center'>
            {loading ? 'Sharing...' : 'Share'}
          </button>
        </div>
      </form>
    </section>
  );
};

// Export the CreatePost component as the default export
export default CreatePost;
