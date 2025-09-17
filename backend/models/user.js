const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const platformSchema = new mongoose.Schema({
    platform:{type: String,required: true},
    username: {type: String, required: true},
});

const UserSchema = new mongoose.Schema({
    username : {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required : true,
        unique:true,
        validate: {
            validator : function(v){  //avaScript regular expression used to validate an email format:
                return /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(v);
            },
            message : props => `${props.value} is not a valid email address!`
        }
    },
    password : {
        type: String,
        required:true,
        minlength:10
    },
    avatar:{
        type:String,
        default: "",
    },
    bio:{
      type:String,
      default:"",
    },
    platforms:[platformSchema],
});


module.exports = mongoose.model('user', UserSchema);