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

//auth or login
//post request- reason is because when you log in you're creating a new "session"
router.post("/auth", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: "Missing Username or Password" });
    }

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ error: "Bad Username" });
    }

    if (user.password !== password) {
      return res.status(401).json({ error: "Bad Password" });
    }

    // Create token
    const token = jwt.encode({ username: user.username }, secret);
    const auth = 1;

    res.json({
      username: user.username,
      token,
      auth
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

//check status of user witha valid token 
router.get("/status", async(req, res)=>{
    if(!req.headers["x-auth"]){
        return res.status(401).json({error: "Missing X-Auth"})
    }

    //if x auth contains the token
    const token = req.headers["x-auth"]
    try{
        const decoded = jwt.decode(token, secret)
        //send back all username and status fields to the user or front end
        let users = User.find({}, "username status")
        res.json(users)
    }
    catch(ex){
        res.status(401).json({error: "invalid jwt"})
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