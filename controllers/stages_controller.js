const stages = require('express').Router();
const db = require('../models');
const {Stage} = db;
const {Op}=require('sequelize');

// FIND ALL STAGES
stages.get('/', async (req, res) => {

    try {
        const searchTerm = req.query.name ? req.query.name: '';
        const foundStages = await Stage.findAll({ 
            order: [ [ 'start_time', 'ASC' ],
                        ['name','ASC'] ],
            where:{
                name:{
                    [Op.iLike] : `%${searchTerm}%`
                }
            }
        })
        res.status(200).json(foundStages)
    } catch (error) {
        res.status(500).json(error)
    }
});

// FIND A SPECIFIC STAGE
stages.get('/:id', async (req, res) => {
    try {
        const foundStage = await Stage.findOne({
            where: { band_id: req.params.id }
        });
        if(!foundStage){
            res.status(404).json({message: 'could not find stage'})
    
        }
        else {
            res.status(200).json(foundStage)
        }
        res.status(200).json(foundStage)
    } catch (error) {
        res.status(500).json(error)
    }
});

// CREATE A STAGE
stages.post('/', async (req, res) => {
    try {
        const newStage = await Stage.create(req.body)
        res.status(200).json({
            message: 'Successfully inserted a new stage',
            data: newStage
        })
    } catch(err) {
        res.status(500).json(err)
    }
})

// UPDATE A STAGE
stages.put('/:id', async (req, res) => {
    try {
        const updatedStages = await Stage.update(req.body, {
            where: {
                event_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully updated ${updatedStages} stage(s)`
        })
    } catch(err) {
        res.status(500).json(err)
    }
})

// DELETE A STAGE
stages.delete('/:id', async (req, res) => {
    try {
        const deletedStages = await Stage.destroy({
            where: {
                event_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully deleted ${deletedStages} stage(s)`
        })
    } catch(err) {
        res.status(500).json(err)
    }
})


module.exports = stages;