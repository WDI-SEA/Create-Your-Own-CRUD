const express = require('express')
const app = express()
const ejsLayouts = require('express-ejs-layouts')
const fs = require('fs')
const methodOverride = require('method-override')
// MIDDLEWARE
app.set('view engine', 'ejs')
app.use(ejsLayouts)
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))
// CONTROLLERS MIDDLEWARE
app.use('/songs', require('./controllers/songs.js'))
// HOME ROUTE
app.get('/', (req, res) => {
    res.render('home.ejs')
})

app.listen(8000, () => {
    console.log("You're listening to port 8000")
})