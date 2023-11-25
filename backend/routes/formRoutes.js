 const mongoose = require('mongoose')
const formData = require('../model/formData')
const router = require('express').Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')  // Import jwt module

router.use(cors())
function verifytoken(req, res, next) {
    try {
        const token = req.headers.token;
        if (!token) throw 'Token not provided';
        let payload = jwt.verify(token, 'reactemployeeapp');
        if (!payload) throw 'Token verification failed';
        next();
    } catch (error) {
        res.status(401).json({ error: 'Unauthorized', message: error });
    }
}

  
// POST method accessible only by admin
router.post('/add',verifytoken,async(req,res)=>{
    try {
        const data=req.body
        const form = await formData(data).save()
        res.status(200).json({message:'successfully posted'})
    } catch (error) {
        res.status(404).json(error)
    }
})

// GET method accessible to both admin and other users
router.get('/', verifytoken, async (req, res) => {
    try {
        const data = await formData.find();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/:id', verifytoken, async (req, res) => {
    try {
      const id = req.params.id;
      const employee = await formData.findById(id);
      if (!employee) {
        return res.status(404).json({ message: 'Employee not found' });
      }
      res.status(200).json(employee);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

// PUT method accessible only by admin
router.put('/edit/:id', verifytoken, async (req, res) => {
    try {
        const id = req.params.id
        const data = req.body
        const updatedForm = await formData.findByIdAndUpdate(id, data, { new: true })
        res.status(200).json(updatedForm)
    } catch (error) {
        res.status(404).json(error)
    }
})

// DELETE method accessible only by admin
router.delete('/remove/:id',verifytoken, async (req, res) => {
    const id = req.params.id;
    try {
      const data = await formData.findByIdAndDelete(id); 
      res.status(200).json("Successfully deleted");
    } catch (error) {
      res.status(500).json(error);
    }
  });

module.exports = router;
