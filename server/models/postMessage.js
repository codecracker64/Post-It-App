import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    title: String,
    message: String,
    creator: String,
    tags: [String],
    selectedFile: String,
    likeCount: {
        type: Number,
        default: 0
    },
    createdOn: {
        type: Date,
        default: new Date()
    }
});

const postMessage = mongoose.model('Posts',postSchema);

export default postMessage;