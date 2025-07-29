const mongoose = require('mongoose')
mongoose.connect("mongodb+srv://sdev255:password255@songdb.csgdrv1.mongodb.net/?retryWrites=true&w=majority&appName=SongDB")

module.exports = mongoose;