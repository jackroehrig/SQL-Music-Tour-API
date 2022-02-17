// DEPENDENCIES
const express = require('express')

// CONFIG
const stages = express.Router()
const db = require('../models')
const {Stage, Event} = db

// ROUTES
stages.get('/', async (req, res) => {
    try {
        const foundStages = await Stage.findAll()
        res.status(200).json(foundStages)
    } catch(err){
        res.status(500).json(err)
    }
})

stages.get('/:id', async (req, res) => {
    try {
        const foundStage = await Stage.findOne({
            where: { stage_id: req.params.id },
            include: {
                model: Event,
                as: 'events',
                where: {stage_id: req.params.id}
            }
        })
        res.status(200).json(foundStage)
    } catch (err) {
        res.status(500).json(err)
    }
})

stages.post('/', async (req, res) => {
    try {
        const newStage = await Stage.create(req.body)
        res.status(200).json({
            message: 'Successfully inserted a new stage',
            data: newStage
        })
    } catch(err){
        res.status(500).json(err)
    }
})

stages.put('/:id', async (req, res) => {
    try {
        const updatedStages = await Stage.update(req.body, {
            where: {
                stage_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully update ${updatedStages} stage(s)`
        })
    } catch(err){
        res.status(500).json(err)
    }
})

stages.delete('/:id', async (req, res) => {
    try {
        const deletedStages = await Stage.destroy({
            where: {
                stage_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully deleted ${deletedStages} stage(s)`
        })
    } catch(err){
        res.status(500).json(err)
    }
})

// EXPORTS
module.exports = stages