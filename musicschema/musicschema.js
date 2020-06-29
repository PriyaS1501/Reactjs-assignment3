let mongoose = require("mongoose");

let musicSchema = mongoose.Schema({
    name: {type : String},
    singer:{type: String}
});

let music = mongoose.model("music", musicSchema);

module.exports = music;
