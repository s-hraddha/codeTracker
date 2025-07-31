const mongoose = require('mongoose');

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
    platforms:{
        leetcode:{type:String},
        codeforces:{type: String},
        gfg: {type: String},
        Hackerrank:{type: String},
        codechef:{type: String},
    }
});

module.exports = mongoose.model('user', UserSchema);