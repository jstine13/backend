//setup.. this is similiar to when we use default ! + tab with html
const express = require("express")
//activates or tells this app variable to be an express server
const app = express()
const router = express.Router()

//starts the web server app.listen(portnumber,function)
app.listen(3000,function() {
    console.log("listening on port 3000")
})

// making an api using routes. routes are used to handle browser request. they look like urls. the difference is that when a browser requests a route it is dynamically handled using a function


//GET request or a regular request when someone goes to 
// http://localhost:3000/hello
//when using a funtion on a route, we almost always have a parameter or handle a response and request
app.get("/hello", function(req, res){
    res.send("<h1>Hello Express</h1>")
})

app.get("/goodbye", function(req, res) {
    res.send("<h1>Goodbye, Express</h1>");
});