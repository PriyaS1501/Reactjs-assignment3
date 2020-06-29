let express = require("express");
let router = express.Router();
let Joi = require("@hapi/joi");
let singer = require("../singerschema/singerschema");
let bcrypt = require("bcrypt");

// get all singer data
router.get("/singers", async (req, res)=>{
let singerData = await singer.find();
res.send({Singerdata : singerData});
});

// get singer by id
router.get("/singers/:id", async(req, res) =>{
let singers = await singer.findById(req.params.id);
 if(!singers){
  return res.status(404).send({message : "Invalid id"});
 }
 res.send ({singer : singers});

});

// create singer data
router.post("/createsinger", async(req, res) =>{
let singers = await singer.findOne({"singerLogin.emailId": req.body.singerLogin.emailId});
if (singers){
    return res.status(403).send({message : "Singer already exists"});
}

let singersdata = new singer({
firstName : req.body.firstName,
lastName: req.body.lastName,
address: req.body.address,
singerLogin: req.body.singerLogin,
});

let saltRounds = 10;
  let salt = await bcrypt.genSalt(saltRounds);

  singersdata.singerLogin.password = await bcrypt.hash(singersdata.singerLogin.password, salt);

/* let result = ValidationError(req.body);
    
    if (result.error) {
        return res.status(400).send(result.error.details[0].message);
    } */

await singersdata.save();
res.send({message :"Account created successfully, Thank you for registration "});

});

// update singer data
router.put("/updatesinger/:id", async(req, res) =>{

    let result = ValidationError(req.body);
    
    if (result.error) {
        return res.status(400).send(result.error.details[0].message);
    }


let singers = await singer.findById(req.params.id);
if(!singers){
    return res.status(404).send({message : "Id not found"});
}

singer.firstName = req.body.firstName;
singer.lastName = req.body.lastName;
singer.address= req.body.address;
singer.singerLogin = req.body.singerLogin;
await singers.save();
res.send({singer : "singer data updated"});

});

// delete singer data
router.delete("/removesinger/:id", async(req, res)=>{
    let singers = await singer.findByIdAndRemove(req.params.id);
    if(!singers){
        return res.status(404).send({message : "Id not found"});
    }
    res.send({message :"singer removed successfully!!!"});
});

function ValidationError(error){
    let schema = Joi.object({
        firstName: Joi.string().min(3).max(100).required(),
        lastName: Joi.string().min(3).max(100).required(),
        address: Joi.string().min(3).max(100).required(),
        singerLogin:{
            emailId:Joi.string().email().min(4).max(100).required(),
            password:Joi.string().min(4).max(15).required()
        }
        });

        return schema.validate(error);

}

module.exports = router;