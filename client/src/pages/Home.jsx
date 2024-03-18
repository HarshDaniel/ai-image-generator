// Import necessary modules from React and custom components
import React, { useState, useEffect } from 'react';
import { Loader, Card, FormField } from '../components';

// Component to render cards based on data and title
const RenderCards = ({ data, title }) => {
  if (data?.length > 0) {
    return (
      data.map((post) => <Card key={post._id} {...post} />)
    );
  }

  return (
    <h2 className='mt-5 font-bold text-[#6449ff] text-xl uppercase'>{title}</h2>
  );
}

// Define the Home component
const Home = () => {
  // State variables using the useState hook
  const [loading, setLoading] = useState(false);
  const [allPosts, setAllPosts] = useState(null);

  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [searchTimeout, setSearchTimeout] = useState(null);

  // Function to fetch posts from the server
  const fetchPosts = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/v1/posts', {
        method: 'GET',
        header: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const result = await response.json();
        setAllPosts(result.data.reverse());
      }
    } catch (error) {
      alert('Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  // useEffect hook to fetch posts on component mount
  useEffect(() => {
    fetchPosts();
  }, []);

  // Function to handle search input change
  const handleSearchChange = async (e) => {
    clearTimeout(searchTimeout);

    setSearchText(e.target.value);

    setSearchTimeout(setTimeout(() => {
      // Filter posts based on search criteria
      const searchResult = allPosts.filter(item =>
        item.name.toLowerCase().includes(searchText.toLowerCase()) ||
        item.prompt.toLowerCase().includes(searchText.toLowerCase())
      );
      setSearchResults(searchResult);
    }, 500));
  }

  // JSX structure for the Home component
  return (
    <section className='max-w-7xl mx-auto'>
      <div>
        <h1 className='font-extrabold text-[#222328] text-[32px]'>Showcase</h1>
        <p className='mt-2 text-[#666e75] text-[16px] max-w-[500px]'>
          Browse through the collection of imaginative and stunning pieces of art created by DALE AI
        </p>
      </div>

      {/* Search input field */}
      <div className='mt-16'>
        <FormField labelName='Search posts' type='text' name='text' placeholder='Search posts' value={searchText} handleChange={handleSearchChange} />
      </div>

      {/* Display loading spinner or search results */}
      <div className='mt-10'>
        {loading ? (
          <div className='flex justify-center items-center'>
            <Loader />
          </div>
        ) : (
          <>
            {searchText && (
              <h2 className='font-medium text-[#666e75] text-xl mb-3 '>
                Search results for <span className='text-[#222328]'>{searchText}</span>
              </h2>
            )}
            {/* Grid layout for displaying cards */}
            <div className='grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3'>
              {searchText ? (
                <RenderCards data={searchResults} title='No search results found' />
              ) : <RenderCards data={allPosts} title='No posts found' />}
            </div>
          </>
        )}
      </div>
    </section>
  );
}

// Export the Home component as the default export
export default Home;
