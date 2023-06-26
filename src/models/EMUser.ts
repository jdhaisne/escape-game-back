import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: String,
    password: String,
});
export const Users = mongoose.model("user", userSchema);