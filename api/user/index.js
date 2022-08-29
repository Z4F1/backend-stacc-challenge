const router = require("express").Router()

const Auth = require("../auth")

const UserModel = require("./UserModel")

router.post("/login", async (req, res, next) => {
    try {
        const user = await UserModel.findOne({ username: req.body.username })
        
        if(user != null){
            const isMatch = await user.comparePassword(req.body.password)
        
            if(isMatch){
                const token = await Auth.Sign({_id: user._id})
                res.json(token)
            }else {
                res.status(401)
                throw new Error("Wrong credentials.")
            }
        }else {
            res.status(401)
            throw new Error("Wrong credentials.")
        }
    } catch (error) {
        next(error)
    }
})

router.post("/", async (req, res, next) => {
    try {
        const userEntry = new UserModel(req.body)
        console.log(req.body)
        const createdEntry = await userEntry.save()

        res.json(createdEntry)
    } catch (error) {
        next(error)
    }
})

router.use(Auth.NeedsAuthorization)

router.get("/", async (req, res, next) => {
    try {
        const userEntries = await UserModel.findOne(req.userdata, "username _id")
        res.json(userEntries)
    } catch (error) {
        next(error)
    }
})

module.exports = router