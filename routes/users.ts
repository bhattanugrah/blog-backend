import express from 'express'
import { Users } from '../models'
const router = express.Router()





router.get('/', async(req, res) => {
    const users = await Users.findAll()
    if(users){
        res.json(users)
    }
    else{
        res.status(404).json()
    }
})

router.delete('/:id', async(req, res) => {
    const user = await Users.findByPk(req.params.id)

    if(user){
        user.destroy()
        .then(() => {
            res.json('User Deleted Succesfully!')
        })
    }
    else{
        res.status(404).json('Cannot Find any user!')
    }
})

router.get('/:id',async(req, res) => {
    try{
        const user = await Users.findByPk(req.params.id)
        if(user){
            res.status(200).json(user)
        }
        else{
            res.status(404).json('Cannot find the user!')
        }
    }
    catch(error){
        res.json(error)
    }
})

router.put('/:id', async(req, res) => {
    const {username, name, disabled} = req.body

    try{
        const user = await Users.findByPk(req.params.id)
        if(!user){
            return res.status(404).send({error: 'Record not found'})
        }

        await user.update({username, name, disabled});
        return res.status(200).json(user)
    }
    catch(err){
        res.status(500).json({error: err})
    }
})

export default router