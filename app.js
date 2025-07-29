const express = require("express")
var cors = require('cors')
// const bodyParser = require('body-parser')
const jwt = require('jwt-simple')
const User = require("./models/users")

const Song = require("./models/song")
const app = express()
app.use(cors())
app.use(express.json())


const router = express.Router()
const secret = "supersecret"

//creating a new user
router.post("/user", async(req, res) =>{
    if(!req.body.username || !req.body.password) {
        res.status(400).json({error: "Missing Username or Password"})
    }
    const newUser = await new User({
        username: req.body.username,
        password: req.body.password,
        status: req.body.status
    })
    try{
        await newUser.save()
        console.log(newUser)
        res.sendStatus(201)//created
    }
    catch(err){
        res.status(400).send(err)
    }
})

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
});
// grab a single songid

router.get("/songs/:id", async (req, res)=> {
    try{
    const song = await Song.findById(req.params.id)
    res.json(song)
    }
    catch (err){
        res.status(400).send(err)
    }
});


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
});

//update is to update an existing record/resource/database entry... it uses a put request

router.put("/songs/:id", async(req, res) => {
    //first we need to find and update the song the front end wants us to update.
    //to do this we need to request the id of the song from request
    //then find it in the db and update it
    try{
        const song = req.body
        await Song.updateOne({_id: req.params.id}, song)
        console.log(song)
        res.sendStatus(204)
    }

    catch(err){
        res.status(400).send(err)
    }
});

// delete

router.delete("/songs/:id", async(req, res) => {
    //method or function in mongoos/mongo to delete a sing instance of a song or object
    try {
        const song = await Song.findById(req.params.id)
        console.log(song)
        await Song.deleteOne({ _id: song._id })
        res.sendStatus(204)
    }
    catch(err){
        res.status(400).send(err)
    }
});



app.use("/api", router)
app.listen(3000)