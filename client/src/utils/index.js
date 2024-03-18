import { surpriseMePrompts } from '../constants';
import FileSaver from 'file-saver';

// Function to get a random prompt, avoiding the current prompt
export function getRandomPrompt(prompt) {
  // Generate a random index within the length of surpriseMePrompts array
  const randomIndex = Math.floor(Math.random() * surpriseMePrompts.length);
  
  // Get a random prompt from the surpriseMePrompts array
  const randomPrompt = surpriseMePrompts[randomIndex];

  // If the randomly selected prompt is the same as the current prompt, recursively call the function
  if (randomPrompt === prompt) return getRandomPrompt(prompt);

  return randomPrompt;
}

// Function to download an image with a specified filename
export async function downloadImage(_id, photo) {
  // Save the image using FileSaver with a filename formatted as 'download-{_id}.jpg'
  FileSaver.saveAs(photo, `download-${_id}.jpg`);
}
