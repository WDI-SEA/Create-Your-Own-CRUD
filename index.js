const express = require('express')
const ejsLayouts = require('express-ejs-layouts')
const fs = require('fs')
const methodOverride = require('method-override')

const app = express()

app.set('view engine', 'ejs')
app.use(ejsLayouts)
app.use(express.urlencoded({extended: false}))
app.use(methodOverride('_method'));

app.listen(8000, ()=>{
    console.log("Let's get this 🍞!")
})

app.get('/', (req,res)=>{
    res.render('home.ejs')
})

app.use('/cooking_videos', require('./routes/cooking_video_routes'))