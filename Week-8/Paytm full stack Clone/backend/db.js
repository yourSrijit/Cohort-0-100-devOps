const mongoose = require('mongoose');

main()
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/paytm');

}

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    }
});

const accountSchema=mongoose.Schema({
     userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:" User",
        required:true
     },
     balance:{
        type:Number,
        required:true
     }
});

// Create a model from the schema
const User = mongoose.model('User', userSchema);
const Account=mongoose.model('Account',accountSchema);

module.exports = {
	User,
    Account
};