const express = require('express')
const router = express.Router();
const fs = require('fs');

// * APPLICATION INDEX ROUTE

router.get('/', (req,res)=>{
    let content = fs.readFileSync('./cooking.json') // retrieving JSON data
    let contentData = JSON.parse(content) // parsing JSON data
    console.log(contentData)
    res.render('cooking_video_view/index.ejs', {contentData: contentData})

})

// * NEW / ADD / CREATE ROUTE
router.get('/new', (req,res) => {
    res.render('cooking_video_view/new.ejs')
})


// * EDIT ROUTE
router.get('/edit/:idx', (req,res)=>{
    let content = fs.readFileSync('./cooking.json') // retrieving JSON data
    let contentData = JSON.parse(content) // parsing JSON data
    res.render('cooking_video_view/edit.ejs', {contentPageId: req.params.idx, contentID: contentData[req.params.idx]} )
    // We are passing the HTML Param to the Content Page ID and the "index" value to access the individual Content Entry ID. 
})

// * UPDATE ROUTE
router.put('/:idx', (req,res)=>{
    let content = fs.readFileSync('./cooking.json') // retrieving JSON data
    let contentData = JSON.parse(content) // parsing JSON data
    contentData[req.params.idx].contentCreator = req.body.contentCreator
    contentData[req.params.idx].contentCountry = req.body.contentCountry
    contentData[req.params.idx].contentUrl = req.body.contentUrl
    contentData[req.params.idx].contentRecipe = req.body.contentRecipe
    contentData[req.params.idx].contentDescription = JSON.stringify(req.body.contentDescription)
    fs.writeFileSync('./cooking.json', JSON.stringify(contentData))
    res.redirect('/cooking_videos')
})

// * INDEX PAGE DISPLAY ROUTE

router.get('/:idx', (req,res)=>{
    let content = fs.readFileSync('./cooking.json') // retrieving JSON data
    let contentData = JSON.parse(content) // parsing JSON data
    let contentIndex = req.params.idx
    res.render('cooking_video_view/show.ejs', {content: contentData[contentIndex]})
})


// POST ROUTE
router.post('/', (req,res)=> {
    let content = fs.readFileSync('./cooking.json') // retrieving JSON data
    let contentData = JSON.parse(content) // parsing JSON data
    contentData.push(req.body)
    fs.writeFileSync('./cooking.json', JSON.stringify(contentData))
    res.redirect('/cooking_videos')
    console.log(req.body)
})

// * DELETE ROUTES

router.delete('/:idx', (req,res)=>{
    let content = fs.readFileSync('./cooking.json') // retrieving JSON data
    let contentData = JSON.parse(content) // parsing JSON data
    let contentIndex = req.params.idx
    contentData.splice(contentIndex, 1)
    fs.writeFileSync('./cooking.json', JSON.stringify(contentData))
    res.redirect('/cooking_videos')
})

module.exports = router;