const express = require("express")
const router = express.Router()
const {Memos} = require("../models/memos.js")
const {authMiddleware} = require("../middlewares/authMiddleware.js")
const {memoSchema} = require("../middlewares/validationMiddleware.js")

// 메모 작성 조회 API
// title < 25
router.post("/memo", authMiddleware, async (req, res) => {
    const {title, content} = req.body
    const {nickname} = res.locals.user

    try {
        const {error} = memoSchema.validate(title, content)

        const memo = await Memos.create({nickname: nickname, title: title, content: content})
    } catch (err) {

    }
})



// 메모 전체 조회 API
router.post("/memo", async (req, res) => {
    try {

    } catch (err) {
        
    }
})
// 메모 detail 상세 조회 API
router.post("/memo", async (req, res) => {
    try {

    } catch (err) {
        
    }
})
// 메모 detail 닉네임별 조회 API
router.post("/memo", async (req, res) => {
    try {

    } catch (err) {
        
    }
})
// 메모 수정 API
router.post("/memo", async (req, res) => {
    try {

    } catch (err) {
        
    }
})
// 메모 삭제 API
router.post("/memo", async (req, res) => {
    try {

    } catch (err) {
        
    }
})


module.exports = router