const router = require("express").Router()
const Pep = require("./PepController")

router.get("/", async (req, res, next) =>{
    try {
        const data = await Pep.findAll()
        
        res.json(data)
    } catch (error) {
        next(error)
    }
})

router.get("/:from", async (req, res, next) =>{
    try {
        const data = await Pep.findAll(parseInt(req.params.from))

        res.json(data)
    } catch (error) {
        next(error)
    }
})

module.exports = router