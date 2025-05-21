
import User from "../models/user.schema.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const Register = async(req, res) => {
    // console.log(req.body);

    try {
        const { name, email,role, password, confirmPassword } = req.body.user;
        console.log(name, email,role, password, confirmPassword);

        if (!name || !email || !role || !password || !confirmPassword) {
            return res.json({success : false, message : "All fields are mandatory!"})
        }

        if (password !== confirmPassword) {
            return res.json({success : false, message : "Password did not matched -_-"})
        }

        // const isEmailExist = await User.find({email : email})

        // it is mongoose querry used to find document it always return array of object

        const isEmailExist = await User.findOne({email : email});

        // it is mongoose querry used to find document it returns the first object that matches the condition

        // const isIdExist = await User.findById("67fdfdc4dc918e170c733ca3");

        // console.log(isIdExist,"isIdExist");

        console.log(isEmailExist,"isEmailExist");

        // if (isEmailExist?.length>0){
        //     return res.send("Email already exist *_*")
        // }

        if (isEmailExist){
            return res.json({success : false , message : "Email already exist *_*"})
        }

        const hashedPassword = await bcrypt.hash(password,10);
        console.log(hashedPassword,"hashedPassword");

        const hasshedConfirmPassword = await    bcrypt.hash(confirmPassword,10);
        console.log(hasshedConfirmPassword,"hasshedConfirmPassword");

        const newUser = User({
            name : name,
            email : email,
            role : role,
            password : hashedPassword,
        });

        // yaha pe humne model schem ko use kiya hia har new user ko track krne ke liye
        console.log(newUser,"newUser")

        const responseFromMongoDB = await newUser.save();
        // this is mongoose features or mongoDB querry used to save data in database since it maybe time consuming so use await at every querry

        console.log(responseFromMongoDB, "responseFromMongoDB")
        return res.json({ success: true, message: "Registration Completed!" });

    } catch (error) {
        res.json({success:false, message : error});
    }

}

export const Login = async(req, res) => {
    try {
        const {email, password} = req.body.userData;

        if (!email || !password){
            return res.json({success: false , message : "All fields are required"})
        }
        console.log(email,"email",password,"password")


        const isEmailExist = await User.findOne({email : email});

        if(isEmailExist){
        console.log(isEmailExist.password,"isEmailExist.password", password,"password");
        const isPasswordCorrect = await bcrypt.compare(password,isEmailExist.password);
        console.log(isPasswordCorrect,"isPasswordCorrect");
        

        const jwtToken = jwt.sign({ userId : isEmailExist._id} , process.env.SECRETKEY)
        console.log(jwtToken,"jwtToken")

        if(isPasswordCorrect){
            return res.json({success : true , message : "Login Successfull!", userData : {userId : isEmailExist._id,role : isEmailExist.role ,name : isEmailExist.name }, token : jwtToken })
        }else {
            return res.json({success  : false , message : "Password not matched"})
        }
        } else{
            return res.json({success : false , message : "Kindly register"})
        }

    } catch (error) {
       return res.json({success : false , message : "Error while Login"})
    }

}

export const GetCurrentUser = async(req,res) => {
    try {
        const token = req.body.token;
        console.log(token,"token")

        if(!token){
            return res.json({success : false , message : "Token Not Found!"})
        }


        const tokenData = jwt.verify(token,process.env.SECRETKEY)
        console.log(tokenData,"tokenData")


        if(!tokenData){
            return res.json({success : false , message : "Token Data Not Found!"})
        }
        const isUserExist = await User.findById(tokenData.userId);
        console.log(isUserExist,"isUserExist")

        const jwtToken = jwt.sign({ userId : isUserExist._id} , process.env.SECRETKEY)


        if(isUserExist){
            return res.json({success : true , message : "Welcome User!", userData : { userId : isUserExist._id, role : isUserExist.role,name : isUserExist.name }, token : jwtToken })

            //  return res.json({success : true , message : "Login Successfull!", userData : { name : isEmailExist.name }, token : jwtToken })
        } else {
            return res.json({success : false , message : "User Not Found!"})

        }
    } catch (error) {
        console.log(error,"error")
        res.json({success : false , message : error})

    }
}