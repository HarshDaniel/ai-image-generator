// Import necessary modules from React and React Router
import React from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';

// Import the logo from the assets folder and the Home, CreatePost components from the pages folder
import { logo } from './assets';
import { Home, CreatePost } from './pages';

// Define the main App component
const App = () => {
  return (
    // Use BrowserRouter to enable client-side routing
    <BrowserRouter>
      {/* Header section with logo and 'Create' link */}
      <header className='w-full flex justify-between items-center bg-white sm:px-8 py-4 border-b border-b-[#e6ebf4]'>
        {/* Link the logo to the home page */}
        <Link to='/'>
          <img src={logo} alt="logo" className='w-28 object-contain' />
        </Link>

        {/* Link to navigate to the 'Create Post' page */}
        <Link to='/create-post' className='font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md'>Create</Link>
      </header>

      {/* Main content section */}
      <main className='sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]'>
        {/* Define routes for different pages */}
        <Routes>
          {/* Route for the home page */}
          <Route path='/' element={<Home />} />

          {/* Route for the 'Create Post' page */}
          <Route path='/create-post' element={<CreatePost />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

// Export the App component as the default export
export default App;
