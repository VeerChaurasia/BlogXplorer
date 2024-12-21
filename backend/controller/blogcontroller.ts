import {Request ,RequestHandler,Response} from 'express';
import { Blog } from '../models/blog';
import User from '../models/user';
interface RequestWithUser extends Request {
    user?: {
        id: number;
    };
}

export const createBlog:RequestHandler =async(req:RequestWithUser,res):Promise<void> =>{
    const {title,content}=req.body;
    const userId = req.user?.id;
    if(!title||!content){
        res.status(400).json({message:"All fields are Required"})
        return
    }
    try{
        const blog=await Blog.create({
            title,
            content,
            userId,
        })
        res.status(201).json(blog);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error creating blog' });
        }
};
export const getBlogs:RequestHandler=async(req,res):Promise<void>=>{
    try{
        const Blogs=await Blog.findAll();
        res.status(200).json(Blogs);
    }catch(error){
        console.error(error)
        res.status(500).json({message:"Error fetching blogs"})
    }
}
export const getBlogById:RequestHandler=async(req,res):Promise<void>=>{
    const{id}=req.params
    try{
        const blog=await Blog.findByPk(id)
        if(!blog){
            res.status(400).json({message:"Error fetching blog by Id"})
            return;
        }
        res.status(200).json(blog);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error fetching blog' });
    }
};
export const updateBlog:RequestHandler=async(req,res):Promise<void>=>{
    const {id}=req.params;
    const {title,content}=req.body;
    try{
        const blog=await Blog.findByPk(id);
        if (!blog) {
            res.status(404).json({ message: 'Blog not found' });
            return;
        }
        blog.title=title||blog.title;
        blog.content=content||blog.content;
        await blog.save();
        res.status(200).json(blog);
    }catch (error){
        console.error(error);
        res.status(500).json({message:"Error Updating blog"})
        
    }
}
export const deleteBlog:RequestHandler=async(req,res):Promise<void>=>{
    const {id}=req.params;
    const blog=await Blog.findByPk(id);
    try{
        if(!blog){
            res.status(400).json({message:"Blog could not be find"})
            return
        }
        await blog.destroy();
        res.status(200).json({message:"Blog has been deleted"})
        }catch (error){
            console.error(error);
            res.status(500).json({message:"Error Updating blog"})
    }
}
