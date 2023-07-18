const express = require("express")
const router = express.Router()
const {Memos} = require("../models")
const authMiddleware = require("../middlewares/authMiddleware.js")
const {memoSchema} = require("../middlewares/validationMiddleware.js")

// 메모 작성 API 완료
// title < 25
router.post("/memo", authMiddleware, async(req, res) => {
    const {title, content} = req.body
    const {nickname} = res.locals.user

    try {
        // title, content 유효성 검사()
        const {error} = memoSchema.validate({title, content})
        // 에러 발생 시, 해당 에러 메시지 전송
        if (error) {
            res.status(412).json({errorMessage: error.details[0].message})
            return
        }

        const memo = 
        await Memos.create({nickname: nickname, title: title, content: content})

        if (!memo) {
            res.status(400).json({ errorMessage: "게시글 작성이 실패하였습니다."})
            return
        }

        res.status(201).json({ message: '메모 작성이 완료되었습니다.'})
    } catch (err) {
        console.log(err)
        res.status(400).json({errorMessage: 'error 발생'})
    }
})

// 메모 전체 조회 페이지네이션 적용 API
// localhost:2023/memo/limit?page= 현재 페이지&pageSize= 페이지 당 항목 수
// 1. page = 현재 페이지 
// 2. paseSize = 페이지 당 노출 항목 수 
// 3. totalPages = 전체 페이지 수 
// 4. totalDatas = 총 데이터 항목 수
router.get("/memo", async (req, res) => {
    const page = parseInt(req.query.page) || 1
    const pageSize = parseInt(req.query.pageSize) || 5

    try {
        // Memos 전체 데이터 개수
        const totalDatas = await Memos.count()
        // 총 페이지 수
        const totalPages = Math.ceil(totalDatas / pageSize)
        // LIMIT과 OFFSET 적용
        const memo = await Memos.findAll({
            attributes: ['memoId','nickname', 'title', 'createdAt'],
            limit: pageSize,
            offset: (page -1) * pageSize
        }) 

        res.status(200).json({
            memo: memo,
            totalDatas,
            totalPages
        })
    } catch (err) {
        console.log(err)
        res.status(400).json({errorMessage: 'error 발생'})
    }
})


/*
// 메모 detail 상세 조회 API
router.get("/memo", async (req, res) => {
    try {

    } catch (err) {
        console.log(err)
        res.status(400).json({errorMessage: 'error 발생'})
    }
})
// 메모 detail 닉네임별 조회 API
router.get("/memo", async (req, res) => {
    try {

    } catch (err) {
        console.log(err)
        res.status(400).json({errorMessage: 'error 발생'})
    }
})
// 메모 수정 API
router.put("/memo", async (req, res) => {
    try {

    } catch (err) {
        console.log(err)
        res.status(400).json({errorMessage: 'error 발생'})
    }
})
// 메모 삭제 API
router.delete("/memo", async (req, res) => {
    try {

    } catch (err) {
        console.log(err)
        res.status(400).json({errorMessage: 'error 발생'})
    }
})
*/

module.exports = router