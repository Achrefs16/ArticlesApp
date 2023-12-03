const express =require('express');
const router=express.Router();
const cors =require('cors');
const multer =require('multer');
const { test ,registerUser,deleteblog,deleteuser,getusers,loginUser,getProfile,CreatePost,getposts,getblog,logout,getpostsUser,registerAdmin,getuser,getAdmin,loginAdmin } =require('../controllers/authControllers')
router.use(
    cors({
        credentials:true,
        origin: 'http://localhost:3000'
    })
)
/*const storage =multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"public/images")
    },
    filename:function(req,file,cb){
        cb(null,file.fieldname)
    }
})*/
const upload =multer({dest:'uploads/'})

router.get('/', test)
router.post('/register',registerUser)
router.post('/adminregister',registerAdmin)
router.post('/login',loginUser)
router.post('/adminlogin',loginAdmin)
router.post('/post',upload.single('file'),CreatePost)
router.get('/profile',getProfile)
router.get('/admin',getAdmin)
router.get('/post',getposts)
router.get('/user',getusers)
router.get('/post/:id',getpostsUser)
router.get('/blog/:id',getblog)
router.get('/logout',logout)
router.get('/user/:id',getuser)
router.delete('/blog/:id',deleteblog)
router.delete('/user/:id',deleteuser)
module.exports =router