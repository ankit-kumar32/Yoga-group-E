const {Sequelize,DataTypes}=require("sequelize")
const  dotenv=require("dotenv")
dotenv.config();
const sequelize=new Sequelize(
    process.env.DB,//db
    process.env.USER,//username
    process.env.PASSWORD,//password
    {
       host:process.env.HOST, //host
       dialect:"mysql",  //type
       pool:{
           max:5,
           min:0
       }
    }
)
const User= sequelize.define("users_new",{
     name:{
        type:DataTypes.STRING
     },
     email:{
        type:DataTypes.STRING
     },
     id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
     },
     password:{
      type:DataTypes.STRING
     }
});


const LoginInfo=sequelize.define("login_info",{
  username:{
    type:DataTypes.STRING
  },
  password:{
    type:DataTypes.STRING
  },
  user_id:{
    type:DataTypes.INTEGER,
    primaryKey:true
  }
})
//User.hasMany(Todo)
//sync does creat a table  as per defined if it doesnt have one
sequelize.sync().then(()=>{
  console.log("user synced")
})
sequelize.authenticate().then(()=>{
  console.log("connection established")
}
)

module.exports={
  sequelize,
  User,
  //Todo,
  LoginInfo
}