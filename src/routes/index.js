const express = require('express');
const router = express.Router();
const {
  getYoutubeVideoInfo,
  downloadFile,
} = require('../controllers/index.controller');

router.get('/url-info', getYoutubeVideoInfo);
router.get('/download', downloadFile);

module.exports = router;