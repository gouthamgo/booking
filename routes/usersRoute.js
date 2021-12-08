const express = require("express");
const router = express.Router();
// express router 
const User = require("../models/user")
//import the user model 

router.post("/register", async(req, res) => {
  

    const newUser = new User({name: req.body.name , email: req.body.email , password: req.body.password})

    try {
        const user = await newUser.save()
        // save the user 
        console.log(req)
        res.send('User Registered successfully')
    } catch (error) {
         return res.status(400).json({ message: error });
    }

});


router.post("/login", async(req, res) => {

    const {email , password} = req.body

    try {
        
        const user = await User.findOne({email : email , password: password})
        // match the subset in a collection 

        if(user){
       
            res.send(currentUser);
        }
        else{
            return res.status(400).json({ message: 'User Login Failed' });
        }

    } catch (error) {
           return res.status(400).json({ message: 'Something went weong' });
    }
  
});






module.exports = router