let express = require("express");
let app = express();
let mongoose = require("mongoose"); // mongoose db
let music = require("./routes/music"); // import mail code file
let singer = require("./routes/singer_register");
let port = 5000 ; // localhost port

app.use(express.json());

mongoose.connect("mongodb://localhost:27017/music", {
    useNewUrlParser: true,
    useUnifiedTopology:true,
})
.then(() => console.log("Connected to db"))
.catch((error) => console.log('something went wrong ${error.message'));

app.use("/musiccollection", music); // url will be http://localhost:5000/musiccollection/Music/
app.use("/musiccollection", singer);

app.listen(port, () => console.log(`port working on ${port}`));

