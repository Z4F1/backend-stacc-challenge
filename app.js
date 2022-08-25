const express = require("express")
const app = express()

const cors = require("cors")
const helmet = require("helmet")
const morgan = require("morgan")

const middleware = require("./middleware")
const api = require("./api")

require("dotenv").config()

app.use(cors())

app.use(morgan("common"))
app.use(helmet())

app.use("/api", api)

app.use(middleware.notFound)
app.use(middleware.errorHandler)

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log("Listening on port %d", port)
})