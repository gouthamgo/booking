const express = require("express");

const app = express();
const cors = require('cors')

// app.use(
//       cors(
//       // // origin:"http://localhost:3000",
//       // origin:"*",
// )
// )
// app.post('http://localhost:5000/api/users/register',(req, res) => {
//       console.log(req)
// })







const dbConfig = require('./db')
app.use(express.json())
// import the rooms route
const roomsRoute = require('./routes/roomsRoute')
const usersRoute = require('./routes/usersRoute')



// access for the rooms route- to go and check the endpoints in rooms route- to fecth the rooms in database
app.use('/api/rooms', roomsRoute)
app.use('/api/users', usersRoute)


const port = process.env.PORT || 5000;

app.listen(port,() => console.log(`yayay Server running on port ${port}`));
