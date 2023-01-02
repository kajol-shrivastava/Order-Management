const customerModel = require("../models/custormerModel")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const { isValid, isValidObjectId,
    validName, isValidMail,
    isValidMobile, isValidRequest,
    isValidPassword,} = require("../validator/validator")



//==============================================register user==============================================//

const register = async function (req, res) {
    try {
        let customerDetails = req.body
        let { fname, lname, email, phone, password} = customerDetails

        if (!isValidRequest(customerDetails)) {
            return res.status(400).send({ status: false, msg: "Please enter details for user registration." })
        }
        if (!isValid(fname)) {
            return res.status(400).send({ status: false, msg: "Please enter fname for registration." })
        }
        if (!validName(fname)) {
            return res.status(400).send({ status: false, msg: `${fname} is not a valid fname.` })
        }
        if (!isValid(lname)) {
            return res.status(400).send({ status: false, msg: "Please enter lname for registration." })
        }
        if (!validName(lname)) {
            return res.status(400).send({ status: false, msg: `${lname} is not a valid lname.` })
        }
        if (!isValid(email)) {
            return res.status(400).send({ status: false, msg: "Please enter email for registration." })
        }
        if (!isValidMail(email)) {
            return res.status(400).send({ status: false, msg: "Please enter a valid email address." })
        }
        let mailCheck = await userModel.findOne({ email })
        if (mailCheck) {
            return res.status(400).send({ status: false, msg: `${email} already registered, try new.` })
        }
        
        if (!phone) {
            return res.status(400).send({ status: false, msg: "Please enter phone number for registration" })
        }
        if (!isValidMobile(phone)) {
            return res.status(400).send({ status: false, msg: "Please enter a valid Indian number." })
        }
        let phoneCheck = await userModel.findOne({ phone })
        if (phoneCheck) {
            return res.status(400).send({ status: false, msg: `${phone} already registered, try new.` })
        }
        if (!password) {
            return res.status(400).send({ status: false, msg: "Please enter a strong password for registration." })
        }
        if (!isValidPassword(password)) {
            return res.status(400).send({ status: false, msg: "Please enter a password which contains min 8 and maximum 15 letters." })
        }
        if (password) {
            const salt = await bcrypt.genSalt(10)
            const newPassword = await bcrypt.hash(password, salt)
            password = newPassword
        }

        let responseBody = { fname, lname, email, phone, password }
        let newCustomer = await customerModel.create(responseBody)
        return res.status(201).send({ status: true, message: "created successfully.", data: newCustomer })
    }
    catch (err) {
        res.status(500).send({ status: false, msg: err.message })
    }
};


//================================================userlogin================================================//

const userLogin = async function (req, res) {
    try {
        let data = req.body

        if (!isValidRequest(data)) {
            return res.status(400).send({ status: false, message: "Invalid Request" })
        }

        let { email, password } = data
        if (!isValid(email)) {
            return res.status(400).send({ status: false, message: "email is required" })
        }

        if (!isValid(password)) {
            return res.status(400).send({ status: false, message: "password is required" })
        }

        if (!isValidMail(email)) {
            return res.status(400).send({ status: false, message: "Please enter a valid email" })
        }

        if (!isValidPassword(password)) {
            return res.status(400).send({ status: false, msg: "Please enter a password which contains min 8 and maximum 15 " })
        }

        const loginUser = await userModel.findOne({ email: email })
        if (!loginUser) {
            return res.status(401).send({ status: false, message: "Not register email-id" })
        }

        let hashedpass = loginUser.password
        const validpass = await bcrypt.compare(password, hashedpass)
        if (!validpass) {
            return res.status(401).send({ status: false, message: "Incorrect Password" })
        }

        let token = jwt.sign(
            {
                userId: loginUser._id,
                iat: Math.floor(Date.now() / 1000),
            }, "pro@3", { expiresIn: '10h' }
        )
        res.setHeader("x-api-key", token)
        let dataToBeSend = { usedId: loginUser._id, token  }
        res.status(200).send({ status: true, message: 'User login successfull', data: dataToBeSend })

    }
    catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }
}

module.exports={register,userLogin}

