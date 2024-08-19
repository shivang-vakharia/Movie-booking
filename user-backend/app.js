const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const routes = require('./routes');
const controllers = require('./controllers');

app.use(bodyParser.json()); //Used to parse body of each and every http request sent by client


// User Registration 
app.post('/register', routes.register);

// User Login
app.post('/login', routes.login);

// Booking showtime
app.post('/book', controllers.jwtMiddleware, routes.book);

// Get user bookings
app.get('/bookings', controllers.jwtMiddleware, routes.user_bookings);

// Get user details for displaying profile
app.get('/profile', controllers.jwtMiddleware, routes.profile);

//Individual booking Receipt display
app.get('/ticket', controllers.jwtMiddleware, routes.ticket);


app.listen(8080, () => {
    console.log('Server listening on port 8000');
})


// Assigning each user a unique user_id/booking_id at the time of registeration/booking 
//Mechanism such that if a user books a particular(or more) seats for a particular showtime_id then those seats wont be avilable for other users and other users wont be able to book seats which have already been booked by other users previously
//image store and fetch using api
// data fetch from database and display in frontend
//CRUD operations for city, movies, cinemas, showtime(date, time) //Administrator

//Payment gateway
//Filter for movies, city, cinema, language etc
//search bar

// Nearest cinema using GPS (optional)
// Registration/Login using OTP verification (optional)
// login/registration using google api (optional)
