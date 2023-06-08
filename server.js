const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
require('dotenv').config();
const connectDB = require('./Config/db');
const PORT = process.env.PORT || 5000; 
const universityRoute = require('./Routes/universityRoute');
const citiesRoute = require('./Routes/citiesRoute');
const majorRoute = require('./Routes/majorRoute');
const eventRoute = require('./Routes/eventRoute');
const eventimagesRoute = require('./Routes/eventimagesRoute');
const branchesRoute = require('./Routes/branchesRoute');
const branchesmajorRoute = require('./Routes/branchesmajorRoute');




app.use(express.json());
app.use(express.urlencoded({ extended: false }))

app.use(cors());

app.use(morgan('common'));
app.use(express.static('public'));  
app.use('/images', express.static('images'));

app.use('/api/university', universityRoute);
app.use('/api/cities', citiesRoute);
app.use('/api/major', majorRoute);
app.use('/api/event', eventRoute);
app.use('/api/eventimages', eventimagesRoute);
app.use('/api/branches', branchesRoute);
app.use('/api/branchesmajor', branchesmajorRoute);



app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on port : ${PORT}`);
});
