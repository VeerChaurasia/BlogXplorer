import { RequestHandler } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/user';
import {Request,Response} from 'express';

const SECRET_KEY = process.env.JWT_SECRET || 'default-secret-key';

if (!SECRET_KEY) throw new Error("JWT_SECRET is not defined");

export const register: RequestHandler = async (req, res): Promise<void> => {
    const { name, email, password } = req.body;
    if (!email || !password || !name) {
        res.status(400).json({ message: 'All fields are required' });
        return;
    }
    try {
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            res.status(400).json({ message: 'User already exists' });
            return;
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashedPassword });
        res.status(201).json({ id: user.id, username: user.name, email: user.email });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating user' });
    }
};
export const login: RequestHandler = async (req, res): Promise<void> => {
    const{email,password}=req.body;
    if(!email|| !password){
        res.status(400).json({message:'All fields are required'});
        return
    }
    try{
        const user = await User.findOne({ where: { email } });
        if (!user) {

            res.status(404).json({ message: 'User not found' });
            return
        }
        const isValid=await bcrypt.compare(password,user.password);
        if(!isValid){
             res.status(400).json({message:"Wrong Password"})
             return
        }
        const jwttoken=jwt.sign({id:user.id},SECRET_KEY,{expiresIn: "5h"})
        res.json({ jwttoken });
        } catch (error) {
        res.status(500).json({ message: 'Error logging in', error });
        }
};