import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    title: String,
    message: String,
    name: String,
    creator: String,
    tags: [String],
    selectedFile: String,
    likes: {
        type: [String],
        default: []
    },
    comments:{
        type: [String],
        default: []
    },
    createdOn: {
        type: Date,
        default: () => new Date()
    }
});

const postMessage = mongoose.model('postsversion1',postSchema);

export default postMessage;