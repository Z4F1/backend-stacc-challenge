const router = require("express").Router();

const Auth = require("./auth")

const pep = require("./pep")
const user = require("./user")

router.use(Auth.CheckToken)

router.get("/", (req, res, next) => {
    res.json("apiv1")
})

router.use("/pep", pep)
router.use("/user", user)

module.exports = router;