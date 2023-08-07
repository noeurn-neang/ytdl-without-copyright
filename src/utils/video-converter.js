const { exec } = require('child_process');
const path = require('path');
const ffmpeg = require('fluent-ffmpeg');

const encodeVideo = async (fileName, onSuccess, onError) => {
  const rootInputPath = path.join(__dirname, '../../files/downloaded'); 
  const rootOutputPath = path.join(__dirname, '../../files/output'); 

  const inputFilePath = path.join(rootInputPath, fileName);
  const outputFilePath = path.join(rootOutputPath, fileName.split('.')[0] + '.mp4');

  // const ffmpegCommand = `ffmpeg -i "${inputFilePath}" -c:v copy -an -map_metadata -1 -c:v copy -an -metadata:s handler_name="Duyin Inc" -metadata:s vendor_id="[0][1][0][1]" "${outputFilePath}"`;
  // const ffmpegCommand = `ffmpeg -i "${inputFilePath}" -an -map_metadata -1 -metadata:s handler_name="Duyin Inc" -metadata:s vendor_id="[0][1][0][1]" "${outputFilePath}"`;

  // exec(ffmpegCommand, (error, stdout, stderr) => {
  //   if (error) {
  //     onError('Error removing sound and metadata:', error.message);
  //     return;
  //   }
  //   onSuccess('Sound and metadata removed successfully.');
  // });
  try {
    ffmpeg(inputFilePath)
      .outputOptions('-map_metadata', '-1')
      .output(outputFilePath)
      .on('progress', (progress) => {
        console.log(`Processing: ${progress.percent.toFixed(2)}% done`);
      })
      .on('end', () => {
        console.log('Metadata removed successfully!');
        onSuccess('Metadata removed successfully!');
      })
      .on('error', (err) => {
        console.error('Error while removing metadata:', err.message);
        onError('Error removing sound and metadata:', err.message);
      })
      .run();
  } catch (err) {
    console.error('Error while processing the video:', err.message);
    onError('Error removing sound and metadata:', err.message);
  }
}

module.exports = { encodeVideo };