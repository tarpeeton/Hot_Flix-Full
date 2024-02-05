const UserModel = require("../model/user");
const bcrypt = require("bcryptjs");
const axios = require("axios");
const JWT = require("jsonwebtoken")
const { SuccessCallback, ErrorCallback } = require("../config/callback");
const { SECRET_KEY, SECRET_TIME, SMS_EMAIL, SMS_TOKEN } = require("../config/default")


// Registratsiyadan o'tish
exports.signUp = async (req, res, next) => {
    try {
        const { name, email, phone, password, role } = req.body;
        const user = await UserModel.findOne({ phone: phone }).select("_id")
        if (!user) {
            const result = new UserModel({
                name: name,
                email: email,
                phone: phone,
                password: password,
                role: role,
            })
            await result.save()
            return SuccessCallback(result, req, res, next)
        }
        else {
            return ErrorCallback("Bunday foydalanuvchi mavjud", req, res, next)
        }
    }
    catch (error) {
        return ErrorCallback(error.message, req, res, next)
    }
}
// Avtorizatsiyadan o'tish;
exports.signIn = async (req, res, next) => {
    const { phone, password, check } = req.body;
    const user = await UserModel.findOne({ phone: phone });
    if (!user || user == undefined) {
        return ErrorCallback("Telefon yoki parol xatolikka uchradi", req, res, next)
    }
    else {
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch || isMatch == false) {
            return ErrorCallback("Telefon yoki parol xatolikka uchradi", req, res, next)
        }
        else {
            // User uchun
            if (check == "client-side") {
                const arraysNumbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
                const randoms = (arrays) => arrays[Math.floor(Math.random() * arrays.length)]
                const code = `${randoms(arraysNumbers)}${randoms(arraysNumbers)}${randoms(arraysNumbers)}${randoms(arraysNumbers)}`
                axios({
                    method: "POST",
                    url: "http://notify.eskiz.uz/api/auth/login",
                    data: { email: SMS_EMAIL, password: SMS_TOKEN, }
                })
                    .then(async (response) => {
                        axios({
                            method: "POST",
                            url: "http://notify.eskiz.uz/api/message/sms/send",
                            headers: { Authorization: `Bearer ${response.data.data.token}`, },
                            data: { mobile_phone: user.phone, message: `@malika_hiy  ` }
                        })
                            .then((callback) => {
                                req.session.phone = user.phone
                                req.session.role = user.role
                                req.session.save()
                                return ErrorCallback("sdfsdf", req, res, next)
                            })
                            .catch((error) => {
                                return ErrorCallback("SMS yuborishda nosozlik mavjud", req, res, next)
                            })
                    })
            }
            // Admin yoki moderator uchun
            if (check == "admin-side") {
                const token = JWT.sign({ id: user._id }, SECRET_KEY, { expiresIn: SECRET_TIME })
                const session = req.session
                session.auth = true;
                session.role =  user.role;
                req.session.save()
                SuccessCallback({ token: token, role: user.role }, req, res, next)
            }
        }
    }
}
exports.confirmCode = async (req, res, next) => {
    const { myCode } = req.query;
    if (!req.session || !req.session.code) {
        return ErrorCallback("Muddat tugadi. Qayta sms yuboring", req, res, next)
    }
    else {
        const { code, id } = req.session;
        if (myCode == code) {
            const token = JWT.sign({ id: id }, SECRET_KEY, { expiresIn: SECRET_TIME })
            return SuccessCallback(token, req, res, next)
        }
        else {
            return ErrorCallback("Kod xato", req, res, next)
        }
    }

}
// Sessiyani o'chirish
exports.logOut = async (req, res, next) => {
    req.session.destroy()
    res.clearCookie("connect.sid")
    res.json({
        message: "Session is deleted"
    })
}
// Decode token
exports.decodeToken = async (req, res, next) => {
    const { authorization } = req.headers
    const base64Url = authorization.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    const decodeToken = JSON.parse(jsonPayload);
    res.json({
        status: true,
        decodeToken: decodeToken,
    })
}







