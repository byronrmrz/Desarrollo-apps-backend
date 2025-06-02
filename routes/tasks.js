var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const taskInit = mongoose.model('tasks', {
    name: String,
    description: String,
    dueDate: String
},'tasks');


router.get('/getTasks', function(req, res, next){
    taskInit.find({}).then((response)=>
        res.status(200).json(response)
        ).catch((err)=>res.status(500).json(err))
        })

router.post('/addTask', function(req, res, next) {
  const { name, description, dueDate } = req.body;

  if (name && description && dueDate) {
    const task = new taskInit({ name, description, dueDate });
    task.save()
      .then((savedTask) => res.status(200).json(savedTask))
      .catch((err) => res.status(500).json(err));
  } else {
    res.status(400).json({ error: 'Faltan campos requeridos: name, description, dueDate' });
  }
});

router.delete('/removeTask/:id', function(req, res, next){
   if( req.params && req.params.id ){
    let id = req.params.id;
    taskInit.deleteOne({_id:new mongoose.Types.ObjectId(id)}).then((response)=>{
        res.status(200).json(response)
    }).catch(err=>res.status(500).json(err))
    }
    else{
        res.status(400).json(tasks)
   }

})
module.exports = router;