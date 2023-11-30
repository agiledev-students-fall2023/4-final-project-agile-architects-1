import jwt from 'jsonwebtoken'
import userSchema from '../schemas/UserSchema.js'

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' })
}

// Login user
export const loginUser = async (req ,res) => {
    const {email, password} = req.body
    try {
        const user = await userSchema.login(email, password)

        // create a token
        const token = createToken(user._id)

        res.status(200).json({email, token})
    } catch (error){
        res.status(400).json({error: error.message})
    }
}

// Register user
export const registerUser = async (req ,res) => {
    const {email, password} = req.body

    try {
        const user = await userSchema.register(email, password)

        // create a token
        const token = createToken(user._id)

        res.status(200).json({email, token})
    } catch (error){
        res.status(400).json({error: error.message})
    }
}

