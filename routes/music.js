let express = require("express");
let router = express.Router(); // replace app with router for public accessibility
let Joi = require("@hapi/joi"); // validation
let music = require("../musicschema/musicschema");// exported schema file

//get  all songs information
router.get("/Music", async (req,res) => {
let musics = await music.find();
    res.send(musics);
});


// GET song by id
router.get ("/Music/:id", async (req ,res) => {
    let song = await music.findById(req.params.id);
    if (!song){
        return res.status(404).send({ message : "Invalid song id"});
    }
    res.send(song);
    });

    // CREATE a song    
    router.post ("/Music/uploadsong", async(req,res) => {
    
let upload = new music({
name : req.body.name,
singer: req.body.singer
});


let result = ValidationError(req.body);

if (result.error) {
    return res.status(400).send(result.error.details[0].message);
}
await upload.save();
res.send({message:"Created new Song successfully"});
});


// UPDATE song by id
router.put("/Music/songs/:id", async(req, res) => {

    //step1:

    
    let result = ValidationError(req.body);
    
    if (result.error) {
        return res.status(400).send(result.error.details[0].message);
    }

//step2 :
let song = await music.findByIdAndUpdate(
    { _id: id },
    { $set:{name:req.body.name, singer:req.body.singer } },
    { new: true }   );

if (!song){
    return res.status(404).send({message : "Invalid song id"});
}

//step3:
res.send({message: "Updated Song successfully", data:song});
});

//DELETE song by id
router.delete("/Music/removesong/:id", async (req,res) => {
    //step1:
    let song = await music.findByIdAndRemove({ _id:req.params.id});
    if (!song){
        return res.status(404).send({message : "Invalid song id"});
    }
    res.send({message:"Song removed successfully!!!"});
}); 


function ValidationError(error){
    let schema = Joi.object({
        name: Joi.string().required(),
        singer: Joi.string().required()
        });

        return schema.validate(error);

}

module.exports = router;