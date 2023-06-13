//Database model for POS

//Import mongoose
const mongoose = require("mongoose");

//Import user model
const { createAdmin } = require("./userModel");

//URI for database
//const dbURI = 'mongodb+srv://xyzharry:QcUYhJlhuz7lNrZm@pos-db.axwe5dg.mongodb.net/posDB';
const dbURI = 'mongodb+srv://rafedjana2003:12345azsx@cluster0.njuanbs.mongodb.net/SynopticProject'; //?retryWrites=true&w=majority
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

//Connect to database
mongoose.connect(dbURI, options).then(
    () => {
        console.log("Database connection established!");
        createAdmin();
    }
).catch(
    (err) => {
        console.log("Error connecting Database instance due to: ", err);
    }
);