// DEPENDENCIES
const express = require('express')
const {Op} = require('sequelize')

// CONFIG
const bands = express.Router()
const db = require('../models')
const {Band, Meet_Greet, Event, Set_Time} = db

// ROUTES
bands.get('/', async (req, res) => {
    try {
        const foundBands = await Band.findAll({
            order: [['available_start_time', 'ASC']],
            where: {
                name: {[Op.like]: `%${req.query.name ? req.query.name : ''}`}
            }
        })
        res.status(200).json(foundBands)
    } catch(err){
        res.status(500).json(err)
    }
})

bands.get('/:name', async (req, res) => {
    console.log(req.query.event)
    try {
        const foundBand = await Band.findOne({
            where: { name: req.params.name },
            include: [{
                model: Meet_Greet, 
                as: "meet_greets",
                include: {
                    model: Event, 
                    as: "event",
                    where: {name: {[Op.like]: `%${req.query.event ? req.query.event : ''}%`}}
                }
            },{
                model: Set_Time,
                as: "set_times",
                include: {
                    model: Event, 
                    as: "event",
                    where: {name: {[Op.like]: `%${req.query.event ? req.query.event : ''}`}}
                }
            }]
        })
        res.status(200).json(foundBand)
    } catch (err) {
        res.status(500).json(err)
    }
})

bands.post('/', async (req, res) => {
    try {
        const newBand = await Band.create(req.body)
        res.status(200).json({
            message: 'Successfully inserted a new band',
            data: newBand
        })
    } catch(err){
        res.status(500).json(err)
    }
})

bands.put('/:id', async (req, res) => {
    try {
        const updatedBands = await Band.update(req.body, {
            where: {band_id: req.params.id}
        })
        res.status(200).json({
            message: `Successfully update ${updatedBands} band(s)`
        })
    } catch(err){
        res.status(500).json(err)
    }
})

bands.delete('/:id', async (req, res) => {
    try {
        const deletedBands = await Band.destroy({
            where: {
                band_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully deleted ${deletedBands} band(s)`
        })
    } catch(err){
        res.status(500).json(err)
    }
})

// EXPORTS
module.exports = bands
