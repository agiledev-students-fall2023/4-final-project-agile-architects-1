import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import validator from 'validator';
import path from 'path' 
import fs from 'fs'
import { fileURLToPath } from 'url';
import { randomBytes } from 'crypto';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const Schema = mongoose.Schema;

const mealPlansSchema = new Schema({
    _id: { type: Schema.Types.ObjectId, required: true, default: () => new mongoose.Types.ObjectId() },
    date: { type: String, required: true },
    meals: {
      Breakfast: [String],
      Lunch: [String],
      Dinner: [String],
    }
  });

const fridgeItemSchema = new Schema({
    _id: { type: Schema.Types.ObjectId, required: true, default: () => new mongoose.Types.ObjectId() },
    name: String,
    quantity: Number,
    purchasedDate: Date,
    expiration: Date,
});

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
        default: "/static/images/profile_pic.png"
      },
    zipcode: {
        type: String,
        default: "NA"
    },
    description: {
        type: String,
        default: "A passionate foodie! I'm always looking for new recipes to try, and love to share my cooking experience with others.",
    },
    mealPlans: [mealPlansSchema],
    fridgeItems: [fridgeItemSchema],
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
userSchema.statics.editUser = async function(_id, email, username, zipcode, usrImg, description) {
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

    let usrImgPath;
    // Process the image if it's provided
    if (usrImg) {
        const base64Data = usrImg.replace(/^data:image\/\w+;base64,/, '');
        const buffer = Buffer.from(base64Data, 'base64');

        // Define file path and name for the user image
        const randomString = randomBytes(4).toString('hex'); // Generate a random string
        const sanitizedName = username.replace(/[^a-zA-Z0-9]/g, '_'); // Sanitize the name
        const fileName = `usrImg-${sanitizedName}-${_id}-${randomString}.png`;
        const imagePath = path.join(__dirname, `./../../public/images/userImages/user${_id}`, fileName);

        // Check if the directory exists, and create it if it doesn't
        const dirPath = path.join(__dirname, `./../../public/images/userImages/user${_id}`);
        if (!fs.existsSync(dirPath)){
            fs.mkdirSync(dirPath, { recursive: true });
        }

        // Write file to the file system
        await fs.writeFile(imagePath, buffer, (err) => err && console.error(err));
        usrImgPath = `/static/images/userImages/user${_id}/${fileName}`;
        console.log(`User image Stored in: ${usrImgPath}`)
    }


    if (email) user.email = email
    if (username) user.username = username;
    if (zipcode) user.zipcode = zipcode;
    //if (!usrImg) console.log(`User image not uploaded`)
    //if (usrImg) console.log(`User image uploaded ${usrImg}`)
    if (usrImg) user.usrImg = usrImgPath;
    if (description) user.description = description;
    await user.save()

    return user
}

userSchema.statics.editUserMeals = async function(_id, meals) {
    const user = await this.findById(_id)
    if (!user) {
        throw Error(`User not found, id: ${_id}`)
    }

    // console.log(meals.updatedMealPlans)

    if (meals.updatedMealPlans) user.mealPlans = meals.updatedMealPlans
    console.log(user)
    await user.save()
    return user
}

userSchema.statics.editFridgeItems = async function(_id, items) {
    const user = await this.findById(_id)
    if (!user) {
        throw Error(`User not found, id: ${_id}`)
    }

    // console.log(meals.updatedMealPlans)

    if (items.updatedFridgeItems) user.fridgeItems = items.updatedFridgeItems
    console.log(user)
    await user.save()
    return user
}

const User = mongoose.model('User', userSchema)
export default User;


