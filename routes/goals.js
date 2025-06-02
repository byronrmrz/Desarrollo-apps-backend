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
  const { name, description, dueDate } = req.body;

  if (name && description && dueDate) {
    const goal = new goalsInit({ name, description, dueDate });
    goal.save()
      .then((savedGoal) => res.status(200).json(savedGoal))
      .catch((err) => res.status(500).json(err));
  } else {
    res.status(400).json({ error: 'Faltan campos requeridos: name, description, dueDate' });
  }
});

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