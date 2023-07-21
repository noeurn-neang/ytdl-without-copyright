const { encodeVideo } = require("./src/utils/video-converter");
const { downloadYT } = require("./src/utils/video-dowloader");

const start = async () => {
  try {
    const downloadResult = await downloadYT('https://www.youtube.com/watch?v=eDA8dokNgqQ&t=36s');
    await encodeVideo(downloadResult);
    console.log('downloadResult', downloadResult)
  } catch (e) {
    console.error('Error While Download', e);
  }
}

start();