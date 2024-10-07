const express = require('express');
const router = express.Router();

const MenuItem = require('./../models/MenuItem');



router.post('/', async (req,res) => {
    try {
      const data = req.body;
  
      const newMenu = new MenuItem(data);
  
      const responce = await newMenu.save();
      console.log("new menu is saved");
      res.status(200).json(responce);
  
  
    }
    catch(err) {
      console.log(err);
      res.status(500).json({error: 'Internal server error'});
    }
  })


   router.get('/', async (req,res) => {
    try {
      const Menus = await MenuItem.find();
  
      console.log('data is fetched');
      res.status(200).json(Menus);
  
    }
    catch (err){
      console.log(err);
      res.status(500).json({error: 'Internal server error'});
    }
  })


  router.get('/:testType', async (req , res) => {
     
    try {
      const testType = req.params.testType;
     
      if(testType == 'Sweet' || testType == 'sour' || testType == 'spicy'){
        const responce = await MenuItem.find({taste : testType})
        console.log('data is fetched');
        res.status(200).json(responce);
      }
      else{
       
        res.status(404).json({error : 'Invalid taste type'});
      } 
    } catch (error) {
      console.log(error);
      res.status(500).json({error: 'Internal Server Error'});
    }
  })


  router.put('/:id', async (req, res) => {

    try {
      const menuId = req.params.id;
      const updetedMenu = req.body;

      const responce = await MenuItem.findByIdAndUpdate(menuId,updetedMenu , {
        new: true,  // Return the updated document
        runValidators: true, // Run Mangoose validation
      })
      
      if (!responce){
        return res.status(404).json({error : 'Person not found'});
      }

     console.log('data id updated')
     res.status(200).json(responce);
    } catch (error) {

      console.log(error);
    res.status(500).json({error: 'Internal Server Error'});
      
    }
    

  })

  router.delete('/:id', async (req, res) => {

    try {
      const menuId = req.params.id;
      
      const responce = await MenuItem.findByIdAndDelete(menuId);
    
  
      if (!responce){
        return res.status(404).json({error : 'Person not found'});
      }
      console.log('data is deleted')
      res.status(200).json(responce);
    } catch (error) {
      console.log(error);
        res.status(500).json({error: 'Internal Server Error'});
    }
  })


module.exports = router;
