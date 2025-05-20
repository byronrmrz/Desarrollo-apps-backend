var express = require('express');
var router = express.Router();


let tasks = [];

router.get('/getTasks', function(req, res, next){
    res.status(200).json(tasks);
})

router.post('/addTask', function(req, res, next){
    let timestamp = Date.now() + Math.random();
    if(req.body && req.body.name && req.body.description, req.body.dueDate){
        req.body.id=timestamp;
        tasks.push(req.body);
    }
    res.status(200).json(tasks);

})

router.delete('/removeTask/:id', function(req, res, next){
   if( req.params && req.params.id ){
    let id = req.params.id;
    const task = tasks.find(task => task.id === id);
    if(!task){
        res.status(400).json({message: 'Task not found'});
    }else{
        tasks = tasks.filter(task =>
            task.id != id);
            res.json(tasks);
       }
    }
    else{
        res.status(200).json([{}])
   }

})
module.exports = router;