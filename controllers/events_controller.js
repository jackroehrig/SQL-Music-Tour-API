// DEPENDENCIES
const express = require('express')

// CONFIG
const events = express.Router()
const db = require('../models')
const {Event} = db

// ROUTES
events.get('/', async (req, res) => {
    try {
        const foundEvents = await Event.findAll({
            order: [['date', 'ASC']]
        })
        res.status(200).json(foundEvents)
    } catch(err){
        res.status(500).json(err)
    }
})

events.get('/:id', async (req, res) => {
    try {
        const foundEvent = await Event.findOne({
            where: { event_id: req.params.id }
        })
        res.status(200).json(foundEvent)
    } catch (err) {
        res.status(500).json(err)
    }
})

events.post('/', async (req, res) => {
    try {
        const newEvent = await Event.create(req.body)
        res.status(200).json({
            message: 'Successfully inserted a new event',
            data: newEvent
        })
    } catch(err){
        res.status(500).json(err)
    }
})

events.put('/:id', async (req, res) => {
    try {
        const updatedEvents = await Event.update(req.body, {
            where: {
                event_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully update ${updatedEvents} event(s)`
        })
    } catch(err){
        res.status(500).json(err)
    }
})

events.delete('/:id', async (req, res) => {
    try {
        const deletedEvents = await Event.destroy({
            where: {
                event_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully deleted ${deletedEvents} event(s)`
        })
    } catch(err){
        res.status(500).json(err)
    }
})

// EXPORTS
module.exports = events