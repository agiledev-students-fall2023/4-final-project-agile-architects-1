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
        console.log(user)
        res.status(200).json({email, token, userId: user._id, mealPlans: user.mealPlans, fridgeItems: user.fridgeItems})
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
    const {email, username, zipcode, usrImg, description } = req.body
    
    try {
        const editedUser = await userSchema.editUser(_id, email, username, zipcode, usrImg, description)
        res.status(200).json({email: editedUser.email,
                              username: editedUser.username,
                              zipcode: editedUser.zipcode,
                              usrImg: editedUser.usrImg,
                              description: editedUser.description,
        })
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

export const editUserMeals = async (req, res) => {
    const { _id } = req.params
    const meals = req.body

    try {
        const editedUser = await userSchema.editUserMeals(_id, meals)
        res.status(200).json({mealPlans: editedUser.meals,
        })
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

export const editFridgeItems = async (req, res) => {
    const { _id } = req.params
    const items = req.body
    try {
        const editedUser = await userSchema.editFridgeItems(_id, items)
        res.status(200).json({items: editedUser.fridgeItems,
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
    if (user){
        console.log("Found user:", user);
    }
    res.status(200).json(user)
}
