//setup.. this is similiar to when we use default ! + tab with html
const express = require("express")
//we have to use cors in order to host a front end and back end on the same device
var cors = require('cors')
//activates or tells this app variable to be an express server
const app = express()
app.use(cors())
const router = express.Router()


// making an api using routes. routes are used to handle browser request. they look like urls. the difference is that when a browser requests a route it is dynamically handled using a function

router.get("/songs", function(req, res){
    const songs = [
        {
            title: "We Found Love",
            artist: "Rihanna",
            popularity: 10,
            releaseDate: new Date(2011, 9, 22),
            genre: ["electro house"]
        },
        {
            title: "Happy",
            artist: "Pharrell Williams",
            popularity: 10,
            releaseDate: new Date(2013, 11, 21),
            genre : ["soul", "neo soul"]
        }
    ];

    res.json(songs)
})

//all requests that usually use an api start with /api... so the url would localhost:3000/api/songs

app.use("/api", router)
app.listen(3000)