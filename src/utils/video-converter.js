const { exec } = require('child_process');
const path = require('path');

const encodeVideo = async (fileName) => {
  const rootInputPath = path.join(__dirname, '../../files/downloaded'); 
  const rootOutputPath = path.join(__dirname, '../../files/output'); 

  const inputFilePath = path.join(rootInputPath, fileName);
  const outputFilePath = path.join(rootOutputPath, fileName.split('.')[0] + '.mp4');

  // const ffmpegCommand = `ffmpeg -i "${inputFilePath}" -c:v libx265 -crf 28 -preset medium -c:a copy "${outputFilePath}"`;
  // const ffmpegCommand = `ffmpeg -i "${inputFilePath}" -c:v libx265 -crf 28 -preset medium -an -map_metadata -1 -metadata handler_name="My VID" -metadata vendor_id="[0][1][0][1]" -filter_complex "[0:v]scale=1920:-1[v]" -map "[v]" "${outputFilePath}"`;
  const ffmpegCommand = `ffmpeg -i "${inputFilePath}" -c:v copy -an -map_metadata -1 "${outputFilePath}"`;

  exec(ffmpegCommand, (error, stdout, stderr) => {
    if (error) {
      console.error('Error removing sound and metadata:', error.message);
      return;
    }
    console.log('Sound and metadata removed successfully.');
  });
}

module.exports = { encodeVideo };