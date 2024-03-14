import userModel from '../models/user.model.js';

export const registerUser = async(req, res) => {
    const {name, email, password } = req.body;
    try {
        const existingUser = await userModel.findOne({ email});
        if(existingUser) {
            return res.status(500).json({message: "User already exists"})
        }
        const newUser =  new userModel({
            username,
            email,
            password
        })
        const savedUser = await newUser.save()
        return res.status(201).json({success: "true", message: savedUser})
        
    } catch (error) {
        res.status(500).json({message: "Interal server error"})
    }
}