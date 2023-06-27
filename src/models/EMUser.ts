import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: String,
    password: String,
    // mail: String,
    // dateOfBirth: String,
    // isAdmin: Boolean
});
export const Users = mongoose.model("user", userSchema);