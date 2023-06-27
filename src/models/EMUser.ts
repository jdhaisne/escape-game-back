const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    id: mongoose.ObjectId,
    name: String,
    firstName: String,
    password: String,
    mail: String,
    dateOfBirth: String,
    isAdmin: Boolean
});
export const Users = mongoose.model("user", userSchema);