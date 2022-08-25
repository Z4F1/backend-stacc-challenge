const router = require("express").Router();

router.get("/", (req, res, next) => {
    res.json("apiv1")
})

module.exports = router;