const express = require("express")
const router = express.Router()
const {loginSchema} = require("../middlewares/validationMiddleware.js")
const { Users } = require("../models/users.js")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

// 로그인 API_완료
router.post("/login", async (req, res) => {
    const { nickname, password} = req.body
    try {
        const {error} = loginSchema.validate({nickname, password})

        // 입력형식 오류 시
        if (error) return res.status(412).json({errorMessage: error.details[0].message})

        // 입력받은 nickname으로 DB에 일치하는 nickname이 있는지 찾기
        const item = await Users.findOne({where: {nickname: nickname}})

        // 없다면 오류 메시지 
        if (!item) return res.status(412).json({errorMessage: '등록되지 않는 닉네임입니다.'})

        // 입력받은 닉네임과 DB 닉네임과 일치 확인 or 비밀번호와 DB 비밀번호와 일치하는지 확인
        const validPassword = await bcrypt.compare(password, item.password)
        if (nickname !== item.nickname || !validPassword) {
            return res.status(400).json({errorMessage: '닉네임이나 비밀번호가 일치하지 않습니다.'})
        }

        // jwt token 생성
        // token = nickname & 비밀키 & 만료시간
        const token = jwt.sign({nickname}, 'secretKey', {expiresIn: '3h'})
        // 쿠키에 담아 클라이언트 헤더로 전송, 
        // 쿠키이름 : 'Authorization'
        // Bearer: JWT형식임을 나타냄
        res.cookie('Authorization', `Bearer ${token}`)
        res.status(200).json({ token: token })
    } catch (err) {
        console.log(err)
        res.status(400).json({errorMessage: '로그인에 실패하였습니다.'})
    }
});

module.exports = router