const fs = require('fs');
const express = require('express')


// * JSON PARSING

const video_index = (req,res) => {
    let content = fs.readFileSync('./cooking.json') // retrieving JSON data
    console.log(content)
    let contentData = JSON.parse(content) // parsing JSON data
    console.log(contentData)
    console.log(video_index)
    res.render('../views/cooking_video_view/index.ejs', {contentData: contentData})
    console.log(req)
    console.log(res)
}

const video_new = (req,res) => {
    res.render('../views/cooking_video_view/new.ejs')
}

const video_index_page_edit = (req,res) => {
    let content = fs.readFileSync('./cooking.json') // retrieving JSON data
    let contentData = JSON.parse(content) // parsing JSON data
    res.render('../views/cooking_video_view/edit.ejs', {contentPageId: req.params.idx, contentID: contentData[req.params.idx]} )
    // We are passing the HTML Param to the Content Page ID and the "index" value to access the individual Content Entry ID. 
}

const video_index_page_update = (req,res) => {
    let content = fs.readFileSync('./cooking.json') // retrieving JSON data
    let contentData = JSON.parse(content) // parsing JSON data
    contentData[req.params.idx].contentCreator = req.body.contentCreator
    contentData[req.params.idx].contentCountry = req.body.contentCountry
    contentData[req.params.idx].contentUrl = req.body.contentUrl
    contentData[req.params.idx].contentRecipe = req.body.contentRecipe
    contentData[req.params.idx].contentDescription = JSON.stringify(req.body.contentDescription)
    fs.writeFileSync('./cooking.json', JSON.stringify(contentData))
    res.redirect('/cooking_videos')
}

const video_index_page = (req,res)=>{
    let content = fs.readFileSync('./cooking.json') // retrieving JSON data
    let contentData = JSON.parse(content) // parsing JSON data
    let contentIndex = req.params.idx
    res.render('../views/cooking_video_view/show.ejs', {content: contentData[contentIndex]})
}

const video_index_update = (req,res)=> {
    let content = fs.readFileSync('./cooking.json') // retrieving JSON data
    let contentData = JSON.parse(content) // parsing JSON data
    contentData.push(req.body)
    fs.writeFileSync('./cooking.json', JSON.stringify(contentData))
    res.redirect('/cooking_videos')
    console.log(req.body)
}

const video_index_page_delete = (req,res)=>{
    let content = fs.readFileSync('./cooking.json') // retrieving JSON data
    let contentData = JSON.parse(content) // parsing JSON data
    let contentIndex = req.params.idx
    contentData.splice(contentIndex, 1)
    fs.writeFileSync('./cooking.json', JSON.stringify(contentData))
    res.redirect('/cooking_videos')
}




module.exports = {
    video_index, 
    video_new,
    video_index_page_edit,
    video_index_page_update,
    video_index_page,
    video_index_update,
    video_index_page_delete,
}