const express = require('express');
const router = express.Router();
const {
  getYoutubeVideoInfo,
  downloadFile,
  removeOutputFile,
} = require('../controllers/index.controller');

router.get('/url-info', getYoutubeVideoInfo);
router.get('/download', downloadFile);
router.get('/remove', removeOutputFile);

module.exports = router;