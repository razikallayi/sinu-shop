const adminModel = require("../model/admin")
const bcrypt = require("bcrypt")
const { generateAccessToken, generateRefreshToken } = require("../utils/auth")

const signup = async (req, res) => {
    const user = req.body
    console.log(user);
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    console.log(hashedPassword)
    var result = await new adminModel({ ...user, password: hashedPassword })
    if (result.save()) {
        res.status(201).json({ success: true, message: "Registration success" })
    } else {
        res.json({ success: false, message: "Failed to save" })
    }
}

const login = async (req, res) => {
    var user = await adminModel.findOne({ email: req.body.email })
    if (user == null) res.status(400).json({ success: false, message: "Invalid username or password" })
    else {
        if (await bcrypt.compare(req.body.password, user.password)) {
            const data = { email: user.email, name: user.name, type: 'admin' }
            const accessToken = generateAccessToken(data)
            const refreshToken = generateRefreshToken(data)
            res.json({ accessToken: accessToken, refreshToken: refreshToken })
        }
        else {
            res.status(400).json({ success: false, message: "Invalid username or password" })
        }
    }
}

const listAdmins = async (req, res) => {
    const result = await adminModel.find(null, null, { skip: 1 })
    res.json(result)
}

const getAdmin = async (req, res) => {
    const result = await adminModel.find(req.body)
    res.json(result)
}

const deleteAdmin = async (req, res) => {
    const result = await adminModel.findByIdAndDelete(req.body.id)
    res.json({ success: true, message: "Delete successfully", data: result })
}

const adminController = {
    signup: signup,
    login: login,
    getAdmin: getAdmin,
    listAdmins: listAdmins,
    deleteAdmin: deleteAdmin
}

module.exports = adminController
