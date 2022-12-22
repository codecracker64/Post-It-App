//contains logic for postsRoutes.

import mongoose from 'mongoose';
import postMessage from '../models/postMessage.js';

export const getPosts = async (req,res)=>{
    try{
        const fetchedPosts = await postMessage.find();
        res.status(200).json(fetchedPosts);
    }
    catch(error){
        res.status(404).json(error);
    }
}

export const createPost = async (req,res)=>{
    const post = req.body;
    const newPost = new postMessage(post);
    try {
        await newPost.save();
        res.status(201).json(newPost); 
    }
    catch (error) {
        res.status(404).json(error);
    }
}

export const updatePost = async (req,res) => {
    const {id} = req.params;
    const post = req.body;

    if(!mongoose.isValidObjectId(id)) return res.status(404).send("Invalid ID");

    const updatedPost = await postMessage.findByIdAndUpdate(id, post , {new:true});

    res.json(updatePost);
}

export const deletePost = async (req,res) => {
    const {id} = req.params;
    
    if(!mongoose.isValidObjectId(id)) return res.status(404).send("Invalid ID");

    await postMessage.findByIdAndDelete(id);

    res.status(200).json({message: `post ${id} delted successfully`});
}

export const likePost = async (req,res) => {
    const {id} = req.params;

    if(!mongoose.isValidObjectId(id)) return res.status(404).send("Invalid ID");

    const updatedPost = await postMessage.findByIdAndUpdate({_id : id}, {$inc:{likeCount : 1}} , {new:true});

    res.status(200).json(updatedPost);
}