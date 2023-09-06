import React, { useState } from 'react';
import Webcam from 'react-webcam';
import axios from 'axios';

function WebcamCapture({ token }) {
    const webcamRef = React.useRef(null);
    const [capturedImage, setCapturedImage] = useState(null);

    const serverURL = 'http://localhost:5000'; // Update this with your server's URL
    const uploadURL = `${serverURL}/api/media/upload`;

    const capture = async () => {
        const imageSrc = webcamRef.current.getScreenshot();
        setCapturedImage(imageSrc);

        const formData = new FormData();
        formData.append('file', dataURLtoFile(imageSrc, 'captured.jpg')); // Updated field name

        try {
            const response = await axios.post(uploadURL, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}` // Use the actual token here
                }
            });
            console.log('Image uploaded:', response);
        } catch (error) {
            console.log('Error uploading image:', error);
        }
    };
    // Helper function to convert dataURL to a File object
    const dataURLtoFile = (dataURL, filename) => {
        const arr = dataURL.split(',');
        const mime = arr[0].match(/:(.*?);/)[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, { type: mime });
    };

    return (
        <div className="bg-gray-100 p-6">
            <h2 className="text-2xl font-semibold mb-4">Webcam Capture</h2>
            <div className="mb-4">
                <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" />
            </div>
            <button
                onClick={capture}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
                Capture Photo
            </button>
            {capturedImage && (
                <div className="mt-4">
                    <img src={capturedImage} alt="Captured" className="w-1/3 h-1/3" />
                </div>
            )}
        </div>
    );
}

export default WebcamCapture;
