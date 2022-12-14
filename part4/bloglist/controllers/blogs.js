const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})
  
blogsRouter.post('/', async (request, response, next) => {
    const body = request.body

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    })

    try {
        const savedBlog = await blog.save()
        response.status(201).json(savedBlog)        
    } catch(exception) {
        next(exception)
    }
})

blogsRouter.delete('/:id', async(request, response) => {
    const id = request.params.id

    await Blog.findByIdAndRemove(id)
    response.status(204).end()
})

blogsRouter.put('/:id', async(request, response) => {
    const id = request.params.id
    const body = request.body 

    const blog = ({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    })

    const updatedBlog = await Blog.findByIdAndUpdate(id, blog, { new: true})
    response.json(updatedBlog)
})

module.exports = blogsRouter