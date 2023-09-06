const { initializeApp } = require("firebase/app");
const { getStorage, ref, uploadBytes, getDownloadURL } = require("firebase/storage");

const firebaseConfig = {
  apiKey: "AIzaSyC90AvWF8QPU--rCY9yJGOpcfzG0PsZi8s",
  authDomain: "camapp-1.firebaseapp.com",
  projectId: "camapp-1",
  storageBucket: "camapp-1.appspot.com",
  messagingSenderId: "662398344393",
  appId: "1:662398344393:web:61b4aa243445ca9fa30118",
  measurementId: "G-CS5EPR0EG1"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get the storage service for the default app
const storage = getStorage(app);
const storageRef = ref(storage); // Define storageRef using ref function

const uploadFile = async (fileBuffer, filename) => {
  const fileRef = ref(storage, filename);
  console.log("file ref in upload file ", fileRef); // Add this line
  try {
    await uploadBytes(fileRef, fileBuffer);
    const url = await getDownloadURL(fileRef);
    console.log("url in uploadFile", url); // Add this line
    return url;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
};


const getFileUrl = async (filename) => {
  const url = await getDownloadURL(ref(storage, filename)); // Use ref function here too
  return url;
}

module.exports = { uploadFile, getFileUrl };