
const express = require("express")
const router = express.Router();
// import the model
const Booking = require("../models/booking")
const Room = require("../models/room");

const moment = require("moment");
const { v4: uuidv4 } = require('uuid');
const stripe= require('stripe')('sk_test_51K4WUPG7p2ARKTxghklsAmUKVtqxERo9fwgWHhlUuwkUYuz5Dhw7xEA9cCUAL5OZkAaSBiL59k927MS20S0wSUaL00KRJzCinO')


// end point
router.post("/bookroom", async (req, res) => {

    const { room,
        userid , 
        fromdate, 
        todate, 
        totaldays, 
        totalamount,
        token
                 } = req.body;

                 try {
                    const customer = await stripe.customers.create({
                      email: token.email,
                      source: token.id,
                    });


                    const payment = await stripe.charges.create(
                        {
                          amount: totalAmount * 100,
                          currency: "AUD",
                          customer: customer.id,
                          receipt_email: token.email,
                        },
                        {
                          idempotencyKey: uuidv4(),
                        }
                      );


                      if(payment){
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
                        });
                
                        await roomtemp.save()
                
                                // res.send("Room Booked Successfully");
                                
                        } catch (error) {
                            return res.status(400).json({ message: error });
                        }

                    }
                      res.send("Payment Successful !!! Room Booked ")

                } catch(error){
                        res.status(400).json({error});
                }
        










       

});

module.exports = router