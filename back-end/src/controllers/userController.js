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

        res.status(200).json({email, token, userId: user._id})
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

        res.status(200).json({email, token, userId: user._id})
    } catch (error){
        res.status(400).json({error: error.message})
    }
}

// Edit user
export const editUser = async (req, res) => {
    const { _id } = req.params
    const {email, username, zipcode } = req.body
    
    try {
        const editedUser = await userSchema.editUser(_id, email, username, zipcode)
        res.status(200).json({email: editedUser.email,
                              username: editedUser.username,
                              zipcode: editedUser.zipcode
        })
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// Get a single user
export const getUser = async (req, res) => {
    const { id } = req.params
    const user = await userSchema.findById(id)
    if (!user) {
        return res.status(404).json({error: 'No such user'})
    }
    res.status(200).json(user)
}
