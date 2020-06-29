let mongoose = require("mongoose");
let singerSchema = mongoose.Schema(
    {
        firstName : {type: String, min: 3, max:100, required:true},
        lastName : {type: String, min:3, max:100, required:true},
        address : {type: String, min:3, max:100, required:true},
        singerLogin:{
            emailId :{ type: String, min:3, max:100, required:true, unique:true},
            password :{ type: String, min:4, max:15, required:true},
        },
    });

let Singer = mongoose.model("singers", singerSchema); 
   
module.exports = Singer;