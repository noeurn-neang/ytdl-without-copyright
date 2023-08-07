const fs = require('fs');
const path = require('path');
const ytdl = require("ytdl-core");

function removeFile(filePath) {
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error('Error removing file:', err);
    } else {
      console.log('File removed successfully.');
    }
  });
}

// Function to generate a random file name using the current date and timestamp
function generateRandomFileName() {
  const date = new Date();
  const timestamp = date.getTime(); // Get the current timestamp in milliseconds
  const randomString = Math.random().toString(36).substring(7); // Generate a random string

  // Combine the date, timestamp, and random string to create a unique file name
  const fileName = `${date.toISOString().slice(0, 10)}_${timestamp}_${randomString}`;
  const extension = '.mp4'; // 

  return fileName + extension;
}

// Example usage:


const downloadYT = async (videoUrl) => {
  const rootPath = path.join(__dirname, '../../files/downloaded'); 
  const fileName = generateRandomFileName();
  const outputFilePath = path.join(rootPath, fileName);
  
  const videoInfo = await ytdl.getInfo(videoUrl);
  const highestQualityFormat = ytdl.chooseFormat(videoInfo.formats, { quality: 'highest' });

  if (!highestQualityFormat) {
    throw new Error('High-quality video format not found.');
  }

  const videoStream = ytdl.downloadFromInfo(videoInfo, { format: highestQualityFormat });

  videoStream.on('progress', (chunkLength, downloaded, total) => {
    const percent = (downloaded / total) * 100;
    console.log(`Downloaded: ${percent.toFixed(2)}%`);
  });

  videoStream.pipe(fs.createWriteStream(outputFilePath));

  return new Promise((resolve, reject) => {
    videoStream.on('end', () => resolve(fileName));
    videoStream.on('error', (e) => {
      removeFile(outputFilePath);
      reject(e);
    });
  });
}

module.exports = { downloadYT, removeFile };