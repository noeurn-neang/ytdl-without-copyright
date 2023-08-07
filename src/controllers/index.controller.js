const { encodeVideo } = require("../utils/video-converter");
const { downloadYT, removeFile } = require("../utils/video-dowloader");
const path = require('path');
const fs = require('fs');

const getYoutubeVideoInfo = async (req, res) => {
  try {
    const { videoUrl } = req.query;
    const downloadResult = await downloadYT(videoUrl);
    encodeVideo(
      downloadResult,
      (msg) => {

        // Remove downloaded file after done encoded
        const rootPath = path.join(__dirname, '../../files/downloaded'); 
        const outputFilePath = path.join(rootPath, downloadResult);
        removeFile(outputFilePath);

        res.send({
          error: false,
          data: {
            fileName: downloadResult,
          }
        })
      },
      (err) => {
        res.status(413).send({
          error: true,
          msg: 'Error while get video info:' + err.message,
        })
      }
    );
  } catch (err) {
    res.status(413).send({
      error: true,
      msg: 'Error while get video info:' + err.message,
    })
  }
};

const downloadFile = (req, res) => {
  const { fileName } = req.query;
  const filePath = path.join(__dirname, '../../files/output/' + fileName);

  const stat = fs.statSync(filePath);
  const fileSize = stat.size;
  const range = req.headers.range;

  if (range) {
    const parts = range.replace(/bytes=/, '').split('-');
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
    const chunkSize = (end - start) + 1;
    const file = fs.createReadStream(filePath, { start, end });
    const headers = {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunkSize,
      'Content-Type': 'video/mp4',
    };
    res.writeHead(206, headers);
    file.pipe(res);
  } else {
    const headers = {
      'Content-Length': fileSize,
      'Content-Type': 'video/mp4',
    };
    res.writeHead(200, headers);
    fs.createReadStream(filePath).pipe(res);
  }
}

const removeOutputFile = (req, res) => {
  try {
    const { fileName } = req.query;

    // Remove downloaded file after done encoded
    const rootPath = path.join(__dirname, '../../files/output'); 
    const outputFilePath = path.join(rootPath, fileName);
    removeFile(outputFilePath);

    res.send({
      error: false,
      msg: 'File has been removed.'
    })
  } catch (e) {
    res.status(400).send({
      error: true,
      msg: e.message
    })
  }
}


module.exports = {
  getYoutubeVideoInfo,
  downloadFile,
  removeOutputFile
}