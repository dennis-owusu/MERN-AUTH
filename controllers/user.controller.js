import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from 'bcryptjs'
export const update = async(req, res, next) =>{
    if(req.user.id !== req.params.userId){
        return next(errorHandler(400, 'You are not allowed to update this user'));
    }
    if(req.body.password){
        if(req.body.password.length < 6){
            return next(errorHandler(403, 'Password must be at least 6 characters'))
        }
         req.body.password = bcryptjs.hashSync(req.body.password, 10)
    }
    if(req.body.username){
        if(req.body.username.length < 7 || req.body.username.length > 20){
            return next(errorHandler(403, 'Username must be between 7 and 20 characters'))
        }
        if(req.body.username.includes(' ')){
            return next(errorHandler(403, 'Username must not contain spaces'));
        }
        if(!req.body.username.match(/^[a-zA-Z0-9]+$/)){
            return next(errorHandler(403, 'Username must contain only letters and numbers'));
        }
        if(req.body.username !== req.body.username.toLowerCase()){
            return next(errorHandler(403, 'Username must be lowercase'));
        }
    }
    try {
        
        const updatedUser = await User.findByIdAndUpdate(req.params.userId, {
            $set: {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                profilePicture: req.body.profilePicture
            }
        }, {new:true})

        if(!updatedUser){
            return next(errorHandler(403, 'User not found'))
        }
        const {password, ...rest} = updatedUser._doc
        res.status(200).json(rest)
    } catch (error) {
        next(error)
    }
    }

    export const deleteUser = async(req, res, next)=>{
        if(req.user.id !== req.params.userId){
            return next(errorHandler(400, 'You are not allowed to delete this user'));
        }

         await User.findByIdAndDelete(req.params.userId)
        res.status(200).json('User has been deleted successfully')
    }

    export const signout = async(req, res, next) =>{
        try {
            res.clearCookie('access_token').json('User has signed out successfully')
        } catch (error) {
            next(error)
        }
    }