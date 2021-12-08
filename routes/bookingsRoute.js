
const express = require("express")
const router = express.Router();
// import the model
const Booking = require("../models/booking")
const Room = require("../models/room");

const moment = require("moment");

// end point
router.post("/bookroom", async (req, res) => {

    const { room,
        userid , 
        fromdate, 
        todate, 
        totaldays, 
        totalamount
                 } = req.body;


        try {
            const newbooking = new Booking({
                room: room.name,
                roomid: room._id,
                userid,
                fromdate: moment(fromdate).format("DD-MM-YYYY"),
                todate: moment(todate).format("DD-MM-YYYY"),
                totalamount,
                totaldays,
                transactionId: '1234'
            })

                const booking = await newbooking.save();
                // get the data in the booking variable

                const roomtemp = await Room.findOne({_id: room._id})

                roomtemp.currentbookings.push({
                    bookingid :booking._id, 
                    fromdate : moment(fromdate).format("DD-MM-YYYY"),
                     todate : moment(todate).format("DD-MM-YYYY"),
                    userid: userid,
                    status: booking.status
        })

        await roomtemp.save()

                res.send("Room Booked Successfully");
                
        } catch (error) {
            return res.status(400).json({ message: error });
        }

});

module.exports = router