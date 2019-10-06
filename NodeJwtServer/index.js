const express = require('express');
const mongoose = require('mongoose');
const dotEnv = require('dotenv/config');

// Get a instance of your express app
const app = express();

// Import routes
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');

// Middleware
app.use(express.json());
app.use('/api/user', authRoute);
app.use('/api/posts', postRoute);


// Connect to DB
mongoose.connect(
    process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }, (err) => {
        if(err == null){
            console.log('connected to DB')
        }else{
            console.log({error : err});
        }
    
});

// Start the application
app.listen(process.env.PORT, () => {
    console.log('app started');
});