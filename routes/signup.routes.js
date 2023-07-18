const express = require("express")
const router = express.Router()
const { signupSchema } = require("../middlewares/validationMiddleware.js")
// Sequelize의 모델 클래스를 상속하기 위해서 Users, UserInfo가 객체가 됨
const { Users, UserInfos } = require("../models")
const bcrypt = require("bcrypt")

// 회원가입 API_완료
router.post("/signup", async(req, res) => {
    const {nickname, password, confirm, email, age, birthyear} = req.body

    try {
        const isExistUser = await Users.findOne({where: {nickname: nickname}})

        const {error} = signupSchema.validate({
            nickname, password, email, age
        })

        // body 데이터 유효성 검사
        if (error) {
            res.status(412).json({errorMessage: error.details[0].message})
            return
        }

        // 닉네임이 중복되는 경우
        if (isExistUser) {
        res.status(412).json({errorMessage: '이미 존재하는 닉네임입니다.'})
        return
        }

        // 닉네임이 포함되어 있는 경우
        if (password.includes(nickname)) {
        res.status(412).json({errorMessage: '패스워드에 닉네임이 포함되어 있습니다.'})
        return
        } 

        // password가 일치하지 않는 경우
        if (password !== confirm) {
            res.status(412).json({errorMessage: '패스워드가 일치하지 않습니다.'})
            return
        }
        // password 형식이 비정상적인 경우
        if (password.length < 4 || password.includes(nickname)) {
            res.status(412).json({errorMessage: '패스워드 형식이 일치하지 않습니다.'})
            return
        } 

        // 비밀번호에 닉네임 포함여부 확인
        const regexp = new RegExp(`${nickname}`)
        if (regexp.test(password)) {
            return res.status(412).json({errorMessage: '비밀번호에 닉네임이 포함되어 있습니다.'})
        }

        // 회원가입
        // 소금 뿌리기
        const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT))
        const hashedPassword = await bcrypt.hash(password, salt)

        const signup = await Users.create({nickname: nickname, password: hashedPassword})

        const userInfo = await UserInfos.create({ // userId, nickname, email, age, birthyear
            userId: signup.userId,
            nickname: nickname,
            email: email,
            age: age,
            birthyear: birthyear
        })

        res.status(201).json({message: '회원가입이 완료되었습니다.'})

    } catch (err) {
        console.log(err)
        res.status(400).json({errorMessage: '요청한 데이터 형식이 올바르지 않습니다.'})
    }
})

// 회원정보 조회 API_완료
router.get("/signup", async(req, res) => {
    try {
        const user = await Users.findAll({
            include: [{
                model: UserInfos, 
                attributes: {exclude: ["createdAt", "updatedAt"]}
            }], raw: true
            
        })

        res.status(200).json({user})
    } catch (err) {
        console.log(err)
        res.status(400).json({errorMessage: '예외사항 발생'})
    }
})


// 회원탈퇴 API
router.delete("/signup/:userId", async(req, res) => {
    const {userId} = req.params

    try {

    } catch (err) {

    }
})


module.exports = router