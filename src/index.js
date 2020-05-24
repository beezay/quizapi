// @Import Modules here
const express= require('express');
const mongoose = require('mongoose');
const cors = require('cors');

//Importing Routes file
const routes = require('./routes/routes');


// @Create APP here
const app = express();



// DB Config
const db = require('./config/keys').mongoURI;


// @Connect to MongoDB
mongoose
    .connect(db)
    .then(()=>console.log('MongoDB connected...'))
    .catch(err=>console.log(err));

    
// @using our apps
app.use(cors());
app.use(express.json());
app.use(routes);



// @Create PORT
const PORT = process.env.PORT || 3000;

// @Create Server
app.listen(PORT, () => console.log(`Server started on port ${PORT}....`));    


