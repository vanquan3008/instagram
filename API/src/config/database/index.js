const mongoose = require('mongoose');
async function connect() {
        try {
            await mongoose.connect('mongodb://127.0.0.1/API_instagram_dev');
            console.log("Connection database successfully established")
        } 
        catch (error) {
            console.log("Error connection")
        }
}

module.exports = {connect};