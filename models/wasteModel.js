//Import mongoose
const mongoose = require("mongoose");
//Define waste schema
const wasteSchema = new mongoose.Schema({
    percentage: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: false
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: false,
    },
});

//Function to create a waste
async function createwaste(percentage, description, startDate, endDate) {
    try {
        const waste = new wasteModel({
            percentage: percentage,
            description: description,
            startDate: startDate,
            endDate: endDate,
        });
        await waste.save();
        console.log("waste created.");
    } catch (err) {
        console.log(err);
    }
}

//Function to get all wastes
async function getAllwastes() {
    try {
        const wastes = await wasteModel.find();
        return wastes;
    } catch (err) {
        console.log(err);
    }
}

//Function to remove a waste
async function removewaste(wasteId) {
    try {
        await wasteModel.deleteOne({ _id: wasteId });
        console.log("waste removed.");
    } catch (err) {
        console.log(err);
    }
}

//Create the waste model with the schema
const wasteModel = mongoose.model("waste", wasteSchema);

/* Test code
testStartDate = "2023-05-20";
testEndDate = "2023-05-21";
createwaste(10, "10% off", new Date(testStartDate), new Date(testEndDate));
*/

//Exports
module.exports = {
    wasteModel: wasteModel,
    createwaste,
    getAllwastes,
    removewaste
}