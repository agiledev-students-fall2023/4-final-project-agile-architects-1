import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import validator from 'validator';


const Schema = mongoose.Schema;

const userSchema = new Schema({
    //id: Number,
    username: {
        type: String,
        default: "User",
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    usrImg: { 
        type: String,
      },
    location: {
        type: String,
    },

}, {timestamps: true}, {collection: 'WasteWise.Test'});

// static register method
userSchema.statics.register = async function(email, password) {
    // validation
    if (!email || !password) {
        throw Error('Both email and password must be filled')
    }

    if (!validator.isEmail(email)){
        throw Error('Email is not valid')
    }
    if (!validator.isStrongPassword(password)) {
        throw Error('Password not strong enough')
    }

    const exists = await this.findOne({ email })
    if (exists) {
        throw Error('Email already in use');
    }
    
    // hashing the password
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({ email, password: hash })
    return user
}


// static login method
userSchema.statics.login = async function(email, password) {
    if (!email || !password) {
        throw Error('Both email and password must be filled')
    }
    const user = await this.findOne({ email })

    if (!user) {
        throw Error('Incorrect Email')
    }

    const match = await bcrypt.compare(password, user.password)
    
    if (!match) {
        throw Error('Incorrect Password')
    }

    return user;
}

export default mongoose.model('User', userSchema);


