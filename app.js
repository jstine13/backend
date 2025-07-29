const express = require("express")
var cors = require('cors')

const Song = require("./models/song")
const app = express()
app.use(cors())


const router = express.Router()

//grab all the songs in a db

router.get("/songs", async(req,res) =>{
   try{
    const songs = await Song.find({})
    res.send(songs)
    console.log(songs)
   }
   catch (err){
    console.log(err)
   }
})

router.post("/songs", async(req,res) => {
    try{
        const song = await new Song(req.body)
        await song.save()
        res.status(201).json(song)
        console.log(song)
    }
    catch(err){
        res.status(400).send(err)
    }
})
app.use("/api", router)
app.listen(3000)