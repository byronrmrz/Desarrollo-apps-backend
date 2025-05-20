var express = require('express');
var router = express.Router();


let goals = [];

router.get('/getGoals', function(req, res, next){
    res.status(200).json(goals);
})

router.post('/addGoals', function(req, res, next){
    let timestamp = Date.now() + Math.random();
    if(req.body && req.body.name && req.body.description, req.body.dueDate){
        req.body.id=timestamp;
        goals.push(req.body);
    }
    res.status(200).json(goals);

})

router.delete('/removeGoal/:id', function(req, res, next){
   if( req.params && req.params.id ){
    let id = req.params.id;
    const goal = goals.find(goal => goal.id === id);
    if(!goal){
        res.status(400).json({message: 'Goal not found'});
        } else {
            goals = goals.filter(task =>
                task.id != id);
                res.json(goals);
        }

   }else{
    res.status(200).json([{}])
   }

})
module.exports = router; 