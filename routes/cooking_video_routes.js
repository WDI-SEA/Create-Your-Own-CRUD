const express = require('express')
const router = express.Router();
const fs = require('fs');
const controllers = require('../controllers/cooking_video_controllers')

// * APPLICATION INDEX ROUTE

router.get('/', controllers.video_index);

// POST ROUTE
router.post('/', controllers.video_index_update)

// * NEW / ADD / CREATE ROUTE
router.get('/new', controllers.video_new);

// * EDIT ROUTE
router.get('/edit/:idx', controllers.video_index_page_edit)

// * UPDATE ROUTE
router.put('/:idx', controllers.video_index_page_update)

// * INDEX PAGE DISPLAY ROUTE

router.get('/:idx', controllers.video_index_page)




// * DELETE ROUTES

router.delete('/:idx', controllers.video_index_page_delete)

module.exports = router;