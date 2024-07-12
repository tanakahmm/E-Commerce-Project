import { hashPassword } from "../helpers/authHelper.js";
import userModule from "../modules/userModule.js";
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

