//contains logic for postsRoutes.

import mongoose from 'mongoose';
import postMessage from '../models/postMessage.js';


export const getPost = async(req,res) =>{
    const {id} = req.params;
    try{
        const post = await postMessage.findById(id);
        // console.log('post----------->',post)
        res.status(200).json(post);   
    }
    catch(error){
        res.status(404).json(error);
    }
}


export const getPosts = async (req,res)=>{
    const {page} = req.query

    try{
        const limit = 8;
        const startIndex = (Number(page)-1)*limit;
        const total = await postMessage.countDocuments({});

        const posts = await postMessage.find().sort({_id:-1}).limit(limit).skip(startIndex);
        // console.log('posts-----------> ',posts);
        // const fetchedPosts = await postMessage.find();
        // res.status(200).json(fetchedPosts);
        res.status(200).json({data: posts, currentPage: Number(page), numberOfPages: Math.ceil(total/limit)});
    }
    catch(error){
        res.status(404).json(error);
    }
}

export const getPostsBySearch = async (req,res) => {
    const { searchQuery, tags} = req.query;
    try{
        const title = new RegExp(searchQuery, 'i');
        const posts = await postMessage.find({ $or : [ {title}, {tags: {$in : tags.split(',')} } ] });
        // console.log("foundPosts-----------_>",posts)
        res.json({data: posts});
    }
    catch(error){
        res.status(404).json({ message: error})
    }
}

export const createPost = async (req,res)=>{
    const post = req.body;
    const newPost = new postMessage({...post, creator: req.userId});
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

    res.json(updatedPost);
}

export const deletePost = async (req,res) => {
    const {id} = req.params;
    
    if(!mongoose.isValidObjectId(id)) return res.status(404).send("Invalid ID");

    await postMessage.findByIdAndDelete(id);

    res.status(200).json({message: `post ${id} delted successfully`});
}

export const likePost = async (req,res) => {
    const {id} = req.params;

    if(!req.userId) return res.json({message: "user not authenticated"});

    if(!mongoose.isValidObjectId(id)) return res.status(404).send("Invalid ID");

    const post = await postMessage.findById(id);

    const index = post.likes.findIndex((id) => id===String(req.userId));

    if(index == -1){
        post.likes.push(req.userId);
    }
    else{
        // post.likes.splice(index,1);
        post.likes = post.likes.filter((id) => id !== String(req.userId));
    }

    const updatedPost = await postMessage.findByIdAndUpdate({_id : id}, post , {new:true});
    // console.log(updatedPost)

    res.status(200).json(updatedPost);
}

export const commentPost = async (req,res) => {
    const {id} = req.params;
    const {value} = req.body;
    try{
        

        const post = await postMessage.findById(id);
        post.comments.push(value);

        const updatedPost =  await postMessage.findByIdAndUpdate(id, post, {new: true});
        // console.log("updatedPost------_>",updatedPost);
        res.status(200).json(updatedPost);
        }
        catch(error){
            console.log(error);
        }
    

}