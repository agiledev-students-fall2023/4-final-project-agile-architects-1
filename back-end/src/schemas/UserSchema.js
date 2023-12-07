import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import validator from 'validator';


const Schema = mongoose.Schema;

const userSchema = new Schema({
    _id: { type: Schema.Types.ObjectId, required: true, default: () => new mongoose.Types.ObjectId() },
    username: {
        type: String,
        default: "User",
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
        default: "/static/images/grey.png"
      },
    zipcode: {
        type: String,
        default: "NA"
    },

}, {timestamps: true, collection: 'User'});

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
        throw Error('Password not strong enough. { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1}')
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


//static edit profile method
userSchema.statics.editUser = async function(_id, email, username, zipcode) {
    // validation

    if (email && (!validator.isEmail(email))){
        throw Error('Email is not valid')
    }
    const user = await this.findById(_id)
    if (!user) {
        throw Error(`User not found, id: ${_id}`)
    }
    const exists = await this.findOne({ email })
    if (exists) {
        throw Error('Email already in use');
    }
    if (email) user.email = email
    if (username) user.username = username;
    if (zipcode) user.zipcode = zipcode;
    await user.save()

    return user
}

const User = mongoose.model('User', userSchema)
export default User;


