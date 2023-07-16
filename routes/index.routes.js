const express = require("express")
const router = express.Router()
// const loginRouter = require("./login.routes.js")
const signupRouter = require("./signup.routes.js")

router.use("", [signupRouter])

module.exports = router