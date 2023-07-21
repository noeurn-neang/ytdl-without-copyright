const { exec } = require('child_process');
const path = require('path');

const encodeVideo = async (fileName) => {
  const rootInputPath = path.join(__dirname, '../../files/downloaded'); 
  const rootOutputPath = path.join(__dirname, '../../files/output'); 

  const inputFilePath = path.join(rootInputPath, fileName);
  const outputFilePath = path.join(rootOutputPath, fileName.split('.')[0] + '.mp4');

  // const ffmpegCommand = `ffmpeg -i "${inputFilePath}" -c:v copy -an -map_metadata -1 -c:v copy -an -metadata:s handler_name="Duyin Inc" -metadata:s vendor_id="[0][1][0][1]" "${outputFilePath}"`;
  const ffmpegCommand = `ffmpeg -i "${inputFilePath}" -an -map_metadata -1 -metadata:s handler_name="Duyin Inc" -metadata:s vendor_id="[0][1][0][1]" -filter:v "setpts=0.9091*PTS" "${outputFilePath}"`;

  exec(ffmpegCommand, (error, stdout, stderr) => {
    if (error) {
      console.error('Error removing sound and metadata:', error.message);
      return;
    }
    console.log('Sound and metadata removed successfully.');
  });
}

module.exports = { encodeVideo };