import jwt from "jsonwebtoken";

//next is given in middleware which render to next route or another middelare
const isAuthenticated=async(req,res,next)=>{
    try 
    {
        const token =req.cookies.token;
        if(!token){
            return res.status(401).json({
                message:"User not authenticated",
                sucess:false
            })
        }

        const decode=await jwt.verify(token,process.env.SECRET_KEY);
        if(!decode){
            return res.status(401).json({
                message:"Invalid token",
                success:false
            })
        }

        req.id=decode.userId;
        next(); //here now send to forward is no error is found 
        



    } catch (error) {
        console.log(error)
        
    }
}

export default isAuthenticated;