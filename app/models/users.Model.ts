import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add a name"],
        trim: true,
        default: "User",
        maxlength: 50
    },
    email: {
        type: String,
        required: [true, "Please add an email"],
        unique: true,
    },
    username:{
        type: String,
        required: [true, "Please add a username"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please add a password"],
        minlength: 6,
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    forgotPasswordToken: String,
    forgotPasswordExpire: Date,
    verified: {
        type: Boolean,
        default: false
    },
    verificationToken: String,
    verificationExpire: Date,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;