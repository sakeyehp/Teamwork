const express = require('express');
const employeeCtrl = require('../controller/employee');
const auth = require('../middleware/auth');
const { multerUploads } = require('../middleware/multer');

const router = express.Router();
router.post('/gifs', auth, multerUploads, employeeCtrl.createGifs);
router.post('/articles', auth, employeeCtrl.createArticle);
router.patch('/articles/:articleId', auth, employeeCtrl.editArticle);
router.delete('/articles/:id', auth, employeeCtrl.deleteArticle);
router.delete('/gifs/:id', auth, employeeCtrl.deleteGif);
router.post('/articles/:id/comment', auth, employeeCtrl.createCommentArticle);
router.post('/gifs/:id/comment', auth, employeeCtrl.gifCreateComment);
router.get('/feed', employeeCtrl.newsFeed);
router.get('/articles/:id', employeeCtrl.viewArticle);
router.get('/gifs/:id', employeeCtrl.viewgif);

module.exports = router;