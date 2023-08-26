const express=require("express");
const cors=require('cors')
const bcrypt=require('bcrypt')
const jwt=require("jsonwebtoken")
const mysql=require('mysql')
const {User}=require('./db')
const app=express();

app.use(cors());

app.use(express.json());

function insertUserToDB(name,email,password){
    return User.create({
       name:name,
       email:email,
       password:password
    })
   }

  // app.post('insertdb',InsertIntoDb);

   async function addUserApi(req,res){
    let name=req.body.name;
    let email=req.body.email;
    let password=await bcrypt.hash(req.body.password,10);
    let response=await insertUserToDB(name,email,password);
    res.status(201).send({"id":response.id})
 }

 async function loginApi(req,res){
    let email=req.body.email;
    let password=req.body.password;
   let user=await User.findOne({
      where:{
        email:email,
      
      } // password:password
    })
  
  let matched= await bcrypt.compare(password,user.password);
  if(matched){
  //generate a token
  const token=jwt.sign({
    name:user.name
  },"Ankit kumar",{
    expiresIn:"5m"
  })
    res.status(200).send(token)
  }
  else{
    res.status(401).send({"LoggedIn":false})
  }
  }

 app.post('/signup',addUserApi)
 app.post('/login',loginApi)

 const port =3044;
 app.listen(port,function(){
  console.log("I am Listening");
})
