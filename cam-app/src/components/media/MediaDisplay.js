import React, { useState, useEffect } from 'react';
import axios from 'axios';

function MediaDisplay({ token }) {
  const [media, setMedia] = useState([]);

  const serverURL = 'http://localhost:5000'; // Update this with your server's URL
  const getURL = `${serverURL}/api/media/media`;

  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    try {
      const response = await axios.get(getURL, {
        headers: {
          'Content-Type': 'application/json', // Update content type
          'Authorization': `Bearer ${token}` // Use the actual token here
        }
      });

      if (response.data.media && response.data.media.length > 0) {
        setMedia(response.data.media);
        console.log('Fetched media data');
      } else {
        console.log('No media found');
      }
    } catch (error) {
      console.log('Fetch media error', error);
    }
  };

  return (
    <div className="bg-gray-100 p-6">
      <h2 className="text-2xl font-semibold mb-4">Media Display</h2>
      <div className="grid grid-cols-2 gap-4">
        {media.length > 0 ? (
          media.map(item => (
            <div key={item._id} className="border rounded-lg overflow-hidden">
              <img src={item.url} alt='Media' className="w-full h-auto" />
            </div>
          ))
        ) : (
          <p className="text-gray-500">No media found</p>
        )}
      </div>
    </div>
  );
}

export default MediaDisplay;
