import mongoose, { Schema } from 'mongoose'

const userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    dateOfBirth: { type: String, required: true },
    stateOfOrigin: { type: String, required: true },
    BVN: { type: String, required: true },
    NIN: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    address: { type: String, required: true }
})

const User = mongoose.models.User || mongoose.model("User", userSchema)

export default User;