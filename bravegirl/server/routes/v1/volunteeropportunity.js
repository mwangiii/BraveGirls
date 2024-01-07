// create routes for volunteer opportunities
// import express
const express = require('express');
const { PrismaClient } = require('@prisma/client');
const router = express.Router();
const prisma = new PrismaClient();


// create volunteer opportunity
router.post('/', async (req, res) => {
    try {
        const {title, description,} = req.body;
        // validate request
        if (!title || !description) {
            return res.status(400).json({ error: 'Please provide a title and description for your volunteer opportunity' });
        }
        // create a new volunteer opportunity
        const volunteeropportunity = await prisma.volunteeropportunity.create({
            data: {
                title,
                description,
            },
        });
        res.status(200).json(volunteeropportunity);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create a new volunteer opportunity' });
    }
});

// get all volunteer opportunities
router.get('/', async (req, res) => {
    try {
        const volunteeropportunities = await prisma.volunteeropportunity.findMany();
        res.status(200).json(volunteeropportunities);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to get all volunteer opportunities' });
    }
});

// get a single volunteer opportunity
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const volunteeropportunity = await prisma.volunteeropportunity.findUnique({
            where: {
                id: parseInt(id),
            },
        });
        res.status(200).json(volunteeropportunity);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to get volunteer opportunity' });
    }
});

// update a volunteer opportunity
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description } = req.body;
        // validate request
        if (!title || !description) {
            return res.status(400).json({ error: 'Please provide a title and description for your volunteer opportunity' });
        }
        // update the volunteer opportunity
        const volunteeropportunity = await prisma.volunteeropportunity.update({
            where: {
                id: parseInt(id),
            },
            data: {
                title,
                description,
            },
        });
        res.status(200).json(volunteeropportunity);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update volunteer opportunity' });
    }
});

// delete a volunteer opportunity
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        // delete the volunteer opportunity
        await prisma.volunteeropportunity.delete({
            where: {
                id: parseInt(id),
            },
        });
        res.status(200).json({ message: 'Volunteer opportunity deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete volunteer opportunity' });
    }
});

module.exports = router;