const Joi = require("joi")

// nickname, password, confirm, email, age, birthyear
// nickname은 4글자 이상, 알파벳과 숫자
// password는 4글자 이상
// email은 email형식에 맞아야 함
// 18 <= age
const signupSchema = Joi.object().keys({
    nickname: Joi.string().min(4).alphanum().pattern(/^[a-zA-Z0-9]+$/).required().messages({
        "string.base": "닉네임은 문자열이어야 합니다.",
        "string.min": "닉네임은 최소 4글자 이상이어야 합니다.",
        "string.alphanum": "닉네임은 알파벳 문자와 숫자를 포함하여야 합니다.",
        "string.empty": "닉네임은 필수항목입니다.",
        "any.required": "요청한 데이터 형식이 올바르지 않습니다."
    }),
    password: Joi.string().min(4).required().messages({
        "string.base": "비밀번호는 문자열이어야 합니다.",
        "string.min": "비밀번호는 최소 4글자 이상이어야 합니다.",
        "any.required": "요청한 데이터 형식이 올바르지 않습니다."
    }),
    email: Joi.string().email().required().messages({
        "string.email": "이메일 형식에 맞게 입력해주세요.",
        "any.required": "이메일은 반드시 입력하셔야 합니다."
    }),
    age: Joi.number().min(18).required().messages({
        "number.base": "18세 이상 이용할 수 있는 서비스입니다."
    })
})

const loginSchema = Joi.object().keys({
    nickname: Joi.string().alphanum().required().messages({
        "any.required": "로그인에 실패하였습니다.",
        "stirng.empty": "로그인에 실패하였습니다."
    }),
    password: Joi.string().required().messages({
        "any.required": "로그인에 실패하였습니다.",
        "stirng.empty": "로그인에 실패하였습니다."
    })
})

const memoSchema = Joi.object().keys({
    title: Joi.string().max(25).required().messages({
        "string.base": "제목은 문자열이어야 합니다.",
        "string.max": "25글자 이상 적을 수 없습니다.",
        "string.empty": "제목은 반드시 입력해야 합니다.",
        "any.required": "제목은 반드시 입력해야 합니다.",
    }),
    content: Joi.string.required().messages({
        "string.base": "내용은 문자열 형식입니다.",
        "string.empty": "내용을 입력해주세요.",
        "any.required": "내용을 입력해주세요."
    })
})

module.exports = {
    signupSchema,
    loginSchema,
    titleSchema
}