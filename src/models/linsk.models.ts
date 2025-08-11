import mongoose, { Document } from "mongoose";

const linksSchema = new mongoose.Schema({
    originalUrl: {
        type: String,
        required: true,
    },
    shortUrl: {
        type: String,
        required: true,
    },
});

linksSchema.set('toJSON', {
  transform: (_document: Document, returnedObject: any) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Links = mongoose.model("Links", linksSchema);

export default Links;