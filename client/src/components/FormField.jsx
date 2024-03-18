// Import necessary modules from React
import React from 'react';

// Define the FormField component
const FormField = ({ labelName, type, name, placeholder, value, handleChange, isSurprise, handleSurpriseMe }) => {
  return (
    // Container for the form field
    <div>
      {/* Label and optional "Surprise Me" button */}
      <div className='flex items-center gap-2 mb-2'>
        {/* Label for the input field */}
        <label htmlFor={name} className='text-sm font-medium text-gray-900'>{labelName}</label>

        {/* Display "Surprise Me" button if isSurprise is true */}
        {isSurprise && (
          <button type='button' onClick={handleSurpriseMe} className='font-semibold text-xs bg-[#ececf1] py-1 px-2 rounded-[5px] text-black'>Surprise me</button>
        )}
      </div>

      {/* Input field with styling */}
      <input
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        required
        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#4649ff] focus:border-[#4649ff] outline-none block w-full p-3'
      />
    </div>
  );
}

// Export the FormField component as the default export
export default FormField;
