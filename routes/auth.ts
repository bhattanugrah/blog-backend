import express from 'express'
import { Users } from '../models'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { SECRET } from '../utils/config'

const router = express.Router()



router.post('/login', async(req, res) => {
    const body = req.body
    const user = await Users.findOne({
        where: {
            username: body.username
        }
    })

    if(user){
        let userRes = {
            'id': user.id,
            'username': user.username,
            'name': user.name,
            'emailId': user.emailId,
            'admin': user.admin,
            'disabled': user.disabled
        }

        if(!bcrypt.compareSync(body.password, user.password)){
            res.status(403).json('The password you entered is incorrect!')
        }
        else{
            const payload ={userId: user.id, username: user.username, emailId: user.emailId, disabled: user.disabled, admin: user.admin}
            const token = jwt.sign(payload, SECRET, {expiresIn: '1h'});
            res.status(200).json({token: token, user: userRes})
        }
    }

})


//This is also the code for creating a new user
router.post('/signup', async(req, res) => {
    const body = req.body
    const salt = bcrypt.genSaltSync(10)
    const passwordHash = bcrypt.hashSync(body.password, salt)

    const existingUser = await Users.findOne({
        where: {
            emailId: body.emailId
        }
    })

    const existingUsername = await Users.findOne({
        where:{
            username: body.username
        }
    })


    let new_user = {
        'username': body.username,
        'name': body.name,
        'emailId': body.emailId,
        'disabled': body.disabled,
        'admin': body.admin,
        'password': passwordHash
    }

    if(existingUser){
        console.log(existingUser)
        res.status(403).json({error: "User already exists with that Email ID!"})
    }

    if(existingUsername){
        res.status(403).json({error: "This username has already been taken!"})
    }


    const user = await Users.create(new_user)
    if(user){
        res.json(user)
    }
    else{
        res.status(400).json('Cannot Create a New User')
    }
})


export default router