import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        required: true,
    },
    passwordHash: {
        type: String,
        required: true,
    },
    links: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Links'
    }]
});

userSchema.set('toJSON', {
  transform: (_document: mongoose.Document, returnedObject: any) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    // the passwordHash should not be revealed
    delete returnedObject.passwordHash
  } 
})

const User = mongoose.model("User", userSchema);

export default User;