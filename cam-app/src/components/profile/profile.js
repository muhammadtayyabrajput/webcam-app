import React, { useEffect, useState } from 'react';
import axios from 'axios';

function UserProfile({ token }) {
    const [userMedia, setUserMedia] = useState([]);
    const [userInfo, setUserInfo] = useState(null);

    const serverURL = 'http://localhost:5000'; // Update this with your server's URL
    const profileURL = `${serverURL}/api/media/profile`;

    useEffect(() => {
        fetchUserProfile();
    }, []);

    const fetchUserProfile = async () => {
        try {
            const response = await axios.get(profileURL, {
                headers: {
                    'Content-Type': 'application/json', // Update content type
                    'Authorization': `Bearer ${token}` // Use the actual token here
                }
            });

            // Ensure the response data structure matches your server's response
            const { user, media } = response.data;

            setUserInfo(user);
            setUserMedia(media);
            console.log("Fetched user profile");
        } catch (error) {
            console.log('Error fetching user profile:', error);
        }
    };

    return (
        <div className="bg-gray-100 p-6">
            <h2 className="text-2xl font-semibold mb-4">User Profile</h2>
            {userInfo && (
                <p className="mb-4">Name: {userInfo.username}</p>
            )}
            <div className="grid grid-cols-2 gap-4">
                {userMedia.map(item => (
                    <div key={item._id} className="border rounded-lg overflow-hidden">
                        <img src={item.url} alt='User media' className="w-full h-auto" />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default UserProfile;
