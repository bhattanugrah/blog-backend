import express from 'express'
import { Blog, Users } from '../models/index'
import jwt from 'jsonwebtoken'
import { SECRET } from '../utils/config'

var router = express.Router()


router.get('/', async(req, res) => {
    const blogs = await Blog.findAll({
        include: {
            model: Users,
            attributes: ['username']
        }
    })

    if(blogs){
        res.json(blogs)
    }
    else{
        res.status(400).json()
        console.log(`Can't find blogs!`)
    }
})


//Blogs of a particular User!
router.get('/user/:id', async(req, res) => {
    const blogs = await Blog.findAll({
        where: {
            userId: req.params.id
        },
        include: {
            model: Users,
            attributes: ['username']
        }
    })

    if(blogs){
        res.status(200).json(blogs)
    }
    else{
        res.status(400).json({error: "Can't find Blogs!"})
    }
})


router.post('/', async(req, res) => {

    const authHeader = req.headers.authorization;

    if(!authHeader){
        return res.status(401).json({error: 'There is no Token Present! Unauthorized!'})
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, SECRET)
    console.log(decoded)

    if(decoded.userId){                          
        const body = req.body

        const user = decoded.userId

        const blogs = await Blog.create({blogTitle: body.blogTitle, blogContent: body.blogContent, userId: user})
        if(blogs){
            return res.json(blogs)
        }
        else{
            return res.status(404).json()
        }
    }else{
        return res.status(401).json({error: 'The Token is not Valid!'})
    }

    
})

router.get('/:id', async(req, res) => {
    const blog = await Blog.findByPk(req.params.id, {
        include:{
            model: Users,
            attributes: ['username']
        }
    })

    if(blog){
        res.json(blog)
    }
    else{
        res.status(404).json()
    }
})

router.delete('/:id', async(req, res) => {
    const blog = await Blog.findByPk(req.params.id)
    if(blog){
        blog.destroy()
        .then(() => {
            res.status(200).json('Row Succesfully Deleted!')
        })
    }
    else{
        res.status(400).json()
    }
})


export default router