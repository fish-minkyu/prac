const jwt = require("jsonwebtoken")
const {Users} = require("../models")


const jwtValidation = async (req, res, next) => {
    const {Authorization} = req.cookies
    try {
        const [tokenType, token] = (Authorization ?? "").split(" ")
        if (tokenType !== "Bearer" || !token) {
            return res.status(403).json({errorMessage: '로그인이 필요한 기능입니다.'})
        }

        // token에서 nickname 추출
        const {nickname} = jwt.verify(token, 'secretKey')

        // token에서 나온 nickname과 DB nickname과 일치하는 것이 있다면 추출
        const user = await Users.findOne({where: {nickname: nickname}})
        // 없을 시, errorMessage 전송
        if (!user) {
            res.clearCookie('Authorization')
            res.status(403).json({errorMessage: '로그인이 필요한 기능입니다.'})
            return 
        }

        res.locals.user = user
        next()
    } catch (err) {
        console.log(err)
        res.clearCookie('Authorization')
        res.status(403).json({errorMessage: '전달된 쿠키에서 오류가 발생하였습니다.'})
        return
    }

}

module.exports = jwtValidation;