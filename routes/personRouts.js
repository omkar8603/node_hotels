const express = require('express');

const router = express.Router();
const Person = require('./../models/person');
const MenuItem = require('../models/MenuItem');
// post route to add a person

router.post('/', async (req,res) => {
    try{
        const data = req.body // Assuming the request body contains the person data
      
        // create a new Person document using the Mongoose model
        const newPerson = new Person(data);
      
      
        // Save the new Person to the database
      
        const responce = await newPerson.save();
        console.log("data is saved");
        res.status(200).json(responce)
       
    }
    catch(error){
         console.log(error);
         res.status(500).json({error: 'Internal server error'});
    }
  })


  // get method

  router.get('/', async (req, res) => {
    try{

      const data =  await Person.find();
      console.log('data is fetched');
      res.status(200).json(data);


    }
    catch(err){
      console.log(err);
      res.status(500).json({error: 'Internal server error'});
    }
})


router.get('/:workType', async (req, res) => {
    try{
      const workType = req.params.workType; // extract the work  type from the URL parameter
      if (workType == 'chef' || workType == 'manager' || workType == 'waiter'){
  
        const responce = await Person.find({work : workType});
        console.log('respoce is fetched');
        res.status(200).json(responce);
       }
      else{
        res.status(404).json({error : 'Invalid work type'});
      }
    }
    catch(err){
      console.log(err);
      res.status(500).json({error: 'Internal Server Error'});
    }
  })
  
 router.put('/:id', async (req, res) => {
  try {
    const personId = req.params.id; // Extract the id from the URL parameter
    const updatedPersonData = req.body; // Upadate data for person

    const responce = await Person.findByIdAndUpdate(personId, updatedPersonData , {
      new: true,  // Return the updated document
      runValidators: true, // Run Mangoose validation
    })
    if (!responce){
      return res.status(404).json({error : 'Person not found'});
    }
    console.log('data updated');
    res.status(200).json(responce);


    
  } catch (error) {
    console.log(error);
    res.status(500).json({error: 'Internal Server Error'});
  }
})


router.delete('/:id', async (req, res) => {
    try {
      const personId = req.params.id;


      const responce = await Person.findByIdAndDelete(personId);

      if (!responce){
        return res.status(404).json({error : 'Person not found'});
      }

      console.log('data deleted');
      res.status(200).json({message: 'Person Deleted Succesfully'});
      
    } catch (error) {
      console.log(error);
      res.status(500).json({error: 'Internal Server Error'});
    }
    
})









  module.exports = router;