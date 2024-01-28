const mongoose = require('mongoose')
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name:{
        type:String, required:[true ,"Please provide a name"]
    }, 
    phone:{
        type:Number, required:[true ,"Please provide a phone"]
    }, 
    city:{
        type:String, required:[true ,"Please provide a city"]
    }, 
    email:{
        type:String, required:true, unique: true,
        required :[true , "Please provide a email"],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },  
    password:{
        type:String, required:[true ,"Please provide a password"],select: false
    }, 
    userType:{
        type:String, required:true
    },
    dateCreated: {
        type:String,
    }
})
userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        next();
    }
    const salt = await bcrypt.genSalt(10);

    this.password = await bcrypt.hash(this.password , salt)
    next();
})


userSchema.methods.matchPasswords = async function(passsword){
    return await bcrypt.compare(passsword , this.passsword);
}


const User = mongoose.model('USER', userSchema);
module.exports = User;