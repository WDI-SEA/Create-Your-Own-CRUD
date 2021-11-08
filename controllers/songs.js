const express = require('express')
const router = express.Router()
const fs = require('fs')

// INDEX ROUTE
router.get('/', (req, res) => {
    let song = fs.readFileSync('./songs.json')
    let songData = JSON.parse(song)
    let songFilter = req.query.songFilter
    if(songFilter) {
        songData = songData.filter((song) => {
            return song.name.toLowerCase() === songFilter.toLowerCase()
        })
    }
    res.render('songs/index.ejs', {songData: songData})
})

// NEW ROUTE
router.get('/new', (req, res) => {
    res.render('songs/new.ejs')
})

// GET UPDATE FORM
router.get('/edit/:idx', (req, res) => {
    let song = fs.readFileSync('./songs.json')
    let songData = JSON.parse(song)
    console.log("Test edit route")
    res.render('songs/edit.ejs', {songId: req.params.idx, song: songData[req.params.idx]})
})

// UPDATE ROUTE
router.put('/:idx', (req, res) => {
    let song = fs.readFileSync('./songs.json')
    let songData = JSON.parse(song)
    songData[req.params.idx].name = req.body.name
    songData[req.params.idx].link = req.body.link
    fs.writeFileSync('./songs.json', JSON.stringify(songData))
    console.log('Posting \n', req.body)
    res.redirect('/songs')
})

// SHOW ROUTE
router.get('/:idx', (req, res) => {
    let song = fs.readFileSync('./songs.json')
    let songData = JSON.parse(song)
    let songIndex = req.params.idx
    res.render('songs/show.ejs', {mySong: songData[songIndex]})
})

// NEW ROUTE
router.post('/', (req, res) => {
    let song = fs.readFileSync('./songs.json')
    let songData = JSON.parse(song)
    songData.push(req.body)
    fs.writeFileSync('./songs.json', JSON.stringify(songData))
    console.log('Posting \n', req.body)
    res.redirect('/songs')
})

// DELETE ROUTE
router.delete('/:idx', (req, res) => {
    let song = fs.readFileSync('./songs.json')
    let songData = JSON.parse(song)
    songData.splice(req.params.idx, 1)
    fs.writeFileSync('./songs.json', JSON.stringify(songData))
    console.log('Posting \n', req.body)
    res.redirect('/songs')
})

module.exports = router