const User =require('../models/user')
const Post =require('../models/post')
const Admin =require('../models/admin')
const{ hashPassword, comparePassword} =require('../helpers/auth')
const jwt= require('jsonwebtoken')
const multer =require('multer')
const uploadMiddelware =multer({dest:'uploads/'})
const fs =require('fs')
const test =(req,res) => {
    res.json('tessst')
}
const registerUser = async (req,res)=>{
 try {
    const {Fullname, Username ,Password } =req.body
     
    if(!Username){
        res.json({
            error:'Username is required'
        })   
    }


const exist = await User.findOne({Username});
if(exist){
    return res.json({
        error : 'Username is taken already'
    })
}




if(!Fullname){
    res.json({
        error:'Full name is required'
    })   
}

if(!Password){
    res.json({
        error:'password is required'
    })
}
if(Password.length < 6){
    res.json({
        error:'password should be at least 6 characters long'
    })
}


const hashedPassword=await hashPassword(Password)

const user =await User.create({
    Fullname,Username,Password:hashedPassword
})
return res.json(user)
 } catch (error) {
    console.log('error 1')
 }
}

const loginUser = async (req,res)=>{
try {
const {Username,Password}=req.body;

if(!Username){
    res.json({
        error:'Username is required'
    })   
} 

if(!Password){
    res.json({
        error:'password is required'
    })
    
}

if(Password.length < 6){
    res.json({
        error:'password should be at least 6 characters long'
    })
}


const user=await User.findOne({Username});
if(!user){
    return res.json({
        error:'No user found'
    })
}
const match =await comparePassword(Password ,user.Password);
if(match){
    
    jwt.sign({id:user._id, Fullname: user.Fullname, Username: user.Username }, process.env.JWT_SECRET,{},(err,token)=>{
        if(err) throw err;
    res.cookie('token',token).json(user)

    
    jwt.verify(token,process.env.JWT_SECRET,{},(err,user)=>{
        if(err) throw err;
        res.json(user) 
        
    })
    })
}
if(!match){
    res.json({
        error:'password does not match'
    })
}
} catch (error) {
    console.log('error 14' )
}
}

const getProfile=(req,res)=>{
  const {token}=req.cookies
  if(token){
    jwt.verify(token,process.env.JWT_SECRET,{},(err,user)=>{
        if(err) throw err;
        res.json(user) 
    
    })
  } else{
    res.json(null)
  }

}
const CreatePost = async(req,res) =>{
    const{userId,Fullname,Title,Summary,Content}=req.body
    const {originalname,path} =req.file;
    const parts= originalname.split('.');
    const ext=parts[parts.length - 1];
    console.log(userId)
    const newpath=path+'.'+ext;
    fs.renameSync(path,path+'.'+ext);
   
    res.json(req.body)
    const newblog = await Post.create({
        userId,
        Fullname,
        Title,
        Summary,
        Content,
        cover:newpath,
       
    })
 
}
const getposts= async(req,res)=>{
    res.json(await Post.find())
}
const getblog= async(req,res)=>{
   const {id} =req.params;
   const blog= await Post.findById(id);
   res.json(blog)

}
const logout=  (req, res) => {
    // Clear the token cookie
  
    res.clearCookie('token');
    // Send a success response (you can customize this)
    res.json('Logout successful');

  };
  const getpostsUser =async(req,res)=>{
    const {id} =req.params;
    const articale= await Post.find({userId:id});
    res.json(articale)
  }
  const getuser=async(req,res)=>{
    const {id} =req.params;
    const user= await User.findById(id);
    res.json(user)
  
  }
  const getAdmin=(req,res)=>{
    const {tokenn}=req.cookies
    if(tokenn){
      jwt.verify(tokenn,process.env.JWT_SECRET,{},(err,admin)=>{
          if(err) throw err;
          res.json(admin) 
          
      })
    } else{
      res.json(null)
    }
  
  }
  const loginAdmin = async (req,res)=>{
    try {
    const {Username,Password}=req.body;
    
    if(!Username){
        res.json({
            error:'Username is required'
        })   
    } 
    
    if(!Password){
        res.json({
            error:'password is required'
        })
        
    }
    
    if(Password.length < 6){
        res.json({
            error:'password should be at least 6 characters long'
        })
    }
    
    
    const user=await Admin.findOne({Username});
    if(!user){
        return res.json({
            error:'No user found'
        })
    }
    const match =await comparePassword(Password ,user.Password);
    if(match){
        
        jwt.sign({id:user._id, Fullname: user.Fullname, Username: user.Username }, process.env.JWT_SECRET,{},(err,token)=>{
            if(err) throw err;
        res.cookie('token',token).json(user)
    
        
        jwt.verify(token,process.env.JWT_SECRET,{},(err,user)=>{
            if(err) throw err;
            res.json(user) 
            
        })
        })
    }
    if(!match){
        res.json({
            error:'password does not match'
        })
    }
    } catch (error) {
        console.log('error 14' )
    }
    }

    const registerAdmin = async (req,res)=>{
    
           const {Fullname, Username ,Password } =req.body
            
           if(!Username){
               res.json({
                   error:'Username is required'
               })   
           }
       
       
       const exist = await Admin.findOne({Username});
       if(exist){
           return res.json({
               error : 'Username is taken already'
           })
       }
       
       
       
       
       if(!Fullname){
           res.json({
               error:'Full name is required'
           })   
       }
       
       if(!Password){
           res.json({
               error:'password is required'
           })
       }
       if(Password.length < 6){
           res.json({
               error:'password should be at least 6 characters long'
           })
       }
       
       
       const hashedPassword=await hashPassword(Password)
       
       const user =await Admin.create({
           Fullname,Username,Password:hashedPassword
       })
       return res.json(user)
     
       }
       const getusers =async(req,res)=>{
        res.json(await User.find())
    }
       const deleteblog =async(req,res)=>{
        const {id} =req.params;
       
         
            const articale= await Post.find({userId:id});
            if (!articale) {
              return res.status(404).json({ message: 'Blog post not found' });
            }else{
             const art = await Post.findByIdAndDelete(id)  
             return res.status(204).send();
            }
       }
       const deleteuser =async(req,res)=>{
        const {id} =req.params;
       
            // Check if the blog post exists
            const user= await User.findById(id);
            const articale= await Post.find({userId:id});
            if (!user) {
              return res.status(404).json({ message: 'User not found' });
            }else{
             const art = await User.findByIdAndDelete(id)  
             if(articale){
                await Post.deleteMany({ userId: id });
             }
             return res.status(204).send();
            }
       }
module.exports = {
    test,
    registerUser,
    loginUser,
    getProfile,
    CreatePost,
    getposts,
    getblog,
    logout,
    getpostsUser,
    getuser,
    getAdmin,
    loginAdmin,
    registerAdmin,
    getusers,
    deleteblog,
    deleteuser
}