// const mongoose= require('mongoose')
// const formData = require('../model/formData')
// const router = require('express').Router()
// const cors= require('cors')
// const jwt = require('jsonwebtoken')
// router.use(cors())

// function verifytoken(req,res,next){
//     try{
//         const token = req.headers.token
//         if(!token) throw 'unauthorized'
//         let payload = jwt.verify(token,'reactemployeeapp')
//         if(!payload) throw 'unauthorized'
//         next()
//     }catch(error){
//         res.status(401).send('error')
//     }
// }


// function verifytoken(req,res,next){
//     try{
//         const token = req.headers.token
//         if(!token) throw 'unauthorized'
//         let payload = jwt.verify(token,'reactemployeeapp')
//         if(!payload) throw 'unauthorized'
//         next()
//     }catch(error){
//         res.status(401).send('error')
//     }
// }
// router.post('/add',verifytoken,async(req,res)=>{
//     try {
//         const data=req.body
//         const form = await formData(data).save()
//         res.status(200).json('successfully posted')
//     } catch (error) {
//         res.status(404).json(error)
//     }
// })

// router.get('/',verifytoken,async(req,res)=>{
//     try{
//         const data = await formData.find()
//         res.status(200).json(data)
//     }catch(error){
//         console.log(error)
//     }
// })

// router.put('/edit/:id',async(req,res)=>{
//     try {
//         var item=req.body;
//        const data= await formData.findByIdAndUpdate(req.params.id,item);
//         res.status(200).send('Updated successfully');
//     } catch (error) {
//         res.status(404).send('Update not working');
//     }
// }) 

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
router.delete('/remove/:id', verifytoken, async (req, res) => {
    try {
        const id = req.params.id
        await formData.findByIdAndRemove(id)
        res.status(200).json('Successfully deleted')
    } catch (error) {
        res.status(404).json(error)
    }
})

module.exports = router



// const mongoose= require('mongoose')
// const formData = require('../model/formData')
// const router = require('express').Router()
// const cors= require('cors')
// router.use(cors())
// function verifytoken(req,res,next){
//     try{
//         const token = req.headers.token
//         if(!token) throw 'unauthorized'
//         let payload = jwt.verify(token,'reactemployeeapp')
//         if(!payload) throw 'unauthorized'
//         next()
//     }catch(error){
//         res.status(401).send('error')
//     }
// }


// router.post('/add',verifytoken,async(req,res)=>{
//     try {
//         const data=req.body
//         const form = await formData(data).save()
//         res.status(200).json('successfully posted')
//     } catch (error) {
//         res.status(404).json(error)
//     }
// })

// router.get('/',verifytoken,async(req,res)=>{
//     try{
//         const data = await formData.find()
//         res.status(200).json(data)
//     }catch(error){
//         console.log(error)
//     }
// })

// module.exports=router