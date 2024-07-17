import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModule from "../modules/userModule.js";
import JWT from "jsonwebtoken";
export const registerController=async(req,res)=>{
    try {
        const {name,email,password,phone,address}=req.body;
        if(!name)
        {
            return res.send({error:'Name is requried'});
        }
        if(!email)
        {
            return res.send({error:'email is requried'});
        }
        if(!password)
        {
            return res.send({error:'password is requried'});
        }     
        if(!phone)
        {
            return res.send({error:'address no is requried'});
        }
        if(!address)
        {
            return res.send({error:'Name is requried'});
        }

        const exisitingUser = await userModule.findOne({email});
        if(exisitingUser){
            return res.status(200).send({
                success: true,
                message: 'Already Register please login',
            })
        }

        const hashedPassword=await hashPassword(password)
        const user=await new userModule({name,email,phone,address,password:hashedPassword}).save()

        res.status(201).send({
            success:true,
            message:'user registered sucessfully',
            user
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'error in registration',
            error
        })
    }
};

export const loginController=async(req,res)=>{
    try {
        const{email,password} = req.body;
        if(!email||!password){
            return res.status(404).send({
                success: false,
                message: 'Invalid email or password'
            })
        }
        const user = await userModule.findOne({email})
        if(!user){
            return res. status(404).send({
                success: false,
                message: 'Email is not registered'
            })
        }
        const match = await comparePassword(password, user.password)
        if(!match)
        {
            return res.status(200).send({
                success:false,
                message:'Invalid password'
            });
        }
        const token=await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });
        res.status(200).send({
            success:true,
            message:'login sucessfully',
            user:{
                name:user.name,
                email:user.email,
                phone:user.phone,
                address:user.address,
            },
            token,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Error in login',
            error
        })
    }
}; 


export const testController=(req,res)=>{
    res.send('Protected Route');
}