var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const goalsInit = mongoose.model('goals', {
    name: String,
    description: String,
    dueDate: String
},'goals');


router.get('/getGoals', function(req, res, next){
    goalsInit.find({}).then((response)=>
        res.status(200).json(response)
        ).catch((err)=>res.status(500).json(err))
        
})

router.post('/addGoals', function(req, res, next){
    if(req.body && req.body.name && req.body.description && req.body.dueDate){
        const goal = new goalsInit(req.body);
        goal.save().then(()=>
            res.status(200).json({ok:true})
        ).catch((err)=>res.status(500).json(err));        
    }else{
        res.status(400).json({error: 'Missing required fields'
        })
    }

})

router.delete('/removeGoal/:id', function(req, res, next){
   if( req.params && req.params.id ){
    let id = req.params.id;
    goalsInit.deleteOne({_id:new mongoose.Types.ObjectId(id)}).then((response)=>{
        res.status(200).json(response)
        }).catch((err)=>res.status(500).json(err))
   }else{
    res.status(200).json([{}])
   }

})
module.exports = router; 