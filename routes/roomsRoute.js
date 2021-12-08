const express = require("express");
const router = express.Router();
// importing the express and creating the router package

// import mongodb data of the room model to fetch the data 
const Room = require("../models/room")
// api end-point -asyn and await functions 
router.get("/getallrooms", async (req, res) => {
   
     try {
          const rooms = await Room.find({}) // pass an empty object
          console.log(rooms);
     res.send(rooms)
     // return res.json({rooms});
     } catch (error) {
          return res.status(400).json({ message: 'something went wrong' });
     }

});

router.post("/getroombyid", async (req, res) => {

     const roomid= req.body.roomid
   
     try {
          const rooms = await Room.findOne({_id: roomid}) 
          console.log(rooms);
     res.send(rooms)
     // return res.json({rooms});
     } catch (error) {
          return res.status(400).json({ message: 'something went wrong' });
     }

});




// export to server as it is the entry for node application 
module.exports = router;
