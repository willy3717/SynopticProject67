//Import Mongoose
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

//Define user schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    nationality: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    dob: {
        type: Date,
        required: true,
    },
    hash: {
        type: String,
        required: true,
    },
    salt: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    _id: {
        type: mongoose.Types.ObjectId,
        auto: true,
    },
});

//Method to set password, generating a salt and hash for the password
userSchema.methods.setPassword = function(password) {
    this.salt = bcrypt.genSaltSync(10);
    this.hash = bcrypt.hashSync(password, this.salt);
};

//Method to validate password by comparing the password with the hash
userSchema.methods.validatePassword = function(password) {
    return bcrypt.compareSync(password, this.hash);
};

//Create the user model with the schema
const userModel = mongoose.model("User", userSchema);

//Create admin user if not exists (call after DB connection is established)
async function createAdmin() {
    try {
        const user = await userModel.findOne({ username: "admin" });
        if (!user) {
            const admin = new userModel({
                username: "admin",
                isAdmin: true,
            });
            admin.setPassword("admin");
            await admin.save();
            console.log("No default admin user found... Default admin user created.");
        }
    } catch (err) {
        console.log(err);
    }
}

//Function to create user for adminAreaController
async function createUser(username, password, isAdmin, address, nationality, email, phone, dob) {
    try {
        const user = new userModel({
            username: username,
            isAdmin: isAdmin,
            address: address,
            nationality: nationality,
            email: email,
            phone: phone,
            dob: dob
        });
        user.setPassword(password);
        await user.save();
        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
}


//Function to get all users
async function getAllUsers() {
    try {
        const users = await userModel.find().select("_id username isAdmin");
        //console.log(users);
        return users;
    } catch (err) {
        console.log(err);
        return null;
    }
}
async function getUserId(username) {
    const user = await userModel.findOne({ username: username });
    if (user)
    {
        return user._id;
    }
    else {
        return null;
    }
}

//Function to remove a user
async function removeUser(userId) {
    try {
        await userModel.deleteOne({ _id: userId });
        console.log("User removed.");
        return true;
    }
    catch (err) {
        console.log(err);
        return false;
    }
}

//Function to login user for loginController
async function loginUser(username, password) {
    try {
        const user = await userModel.findOne({ username: username });
        //console.log(user + " found");
        //User exists
        if(user){
            //console.log("User found");
            //Validate password
            if(user.validatePassword(password)){
                console.log("User found");
                //Return user object for session use later
                return user;
            }
            else{
                console.log("Invalid Credentials");
            }
        }
        else{
            console.log("User not found");
            return false;
        }
    } catch (err) {
        console.log(err);
        return false;
    }
}

//Function to check if a user is an admin
async function isAdmin(username) {
    try {
        const user = await userModel.findOne({ username: username });
        if(user.isAdmin === true){
            return true;
        }
        else{
            return false;
        }
    } catch (err) {
        console.log(err);
        return false;
    }
}

//Get userID with user object
function getUserId(user) {
    try{
        return user._id;
    }
    catch(err){
        console.log(err);
        return null;
    }
}

//Exports
module.exports = {
    userModel,
    createAdmin,
    loginUser,
    createUser,
    isAdmin,
    getAllUsers,
    removeUser,
    getUserId,
}
