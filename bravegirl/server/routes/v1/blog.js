//  add routes for blog posts
const express = require('express');
const { PrismaClient } = require('@prisma/client');
const router = express.Router();
const prisma = new PrismaClient();


// create blog post
router.post('/', async (req, res) => {
    try {
        const { title, content } = req.body;
        // validate request
        if (!title || !content) {
            return res.status(400).json({ error: 'Please provide a title and content for your post' });
        }
        // create a new post
        const post = await prisma.post.create({
            data: {
                title,
                content,
            },
        });
        res.status(200).json(post);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create a new post' });
    }
});

// get all blog posts
router.get('/', async (req, res) => {
    try {
        const posts = await prisma.post.findMany();
        res.status(200).json(posts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to get all posts' });
    }
});

// get a single blog post
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const post = await prisma.post.findUnique({
            where: {
                id: parseInt(id),
            },
        });
        res.status(200).json(post);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to get post' });
    }
});

// update a blog post
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;
        // validate request
        if (!title || !content) {
            return res.status(400).json({ error: 'Please provide a title and content for your post' });
        }
        // update post
        const post = await prisma.post.update({
            where: {
                id: parseInt(id),
            },
            data: {
                title,
                content,
            },
        });
        res.status(200).json(post);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update post' });
    }
});

// delete a blog post
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        // delete post
        const post = await prisma.post.delete({
            where: {
                id: parseInt(id),
            },
        });
        res.status(200).json(post);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete post' });
    }
});
module.exports = router;