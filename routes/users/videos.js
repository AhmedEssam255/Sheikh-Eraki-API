import express from 'express';
import {getVideos, searchVideos} from '../../controllers/users/videosController.js';

const videos = express.Router();

videos.get('/', getVideos);
videos.get('/search', searchVideos);

export default videos;