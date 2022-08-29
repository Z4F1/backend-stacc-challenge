const router = require("express").Router();

const pep = require("./pep")

router.get("/", (req, res, next) => {
    res.json("apiv1")
})

router.use("/pep", pep)

module.exports = router;