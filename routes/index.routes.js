const express = require("express")
const router = express.Router()
const signupRouter = require("./signup.routes.js")
const loginRouter = require("./login.routes.js")
const memoRouter = require("./memo.routes.js")

router.use("", [signupRouter, loginRouter, memoRouter])

module.exports = router