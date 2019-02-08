const express = require ('express');
var router =  express.Router();

var ObjectId = require ('mongoose').Types.ObjectId;

var {Employee} = require ('../models/employee');

//localhost://3000/employee

router.get('/', (req, res) => {
    Employee.find((err, docs) => {
        if (!err){
            res.send(docs);
        }
        else{
            console.log('Error in retrievin Employees' + JSON.stringify(err, undefined, 2));
        }
    });
});

router.get('/:id', (req, res)=> {
    if (!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No record for this id: ${req.params.id}`);
    Employee.findById(req.params.id),(err, doc) => {
        if (!err){
            res.send(doc);
        }
        else{
            console.log('Error in retriebing id' +JSON.stringify(err, undefined, 2));
        }

    }
}); 

    
router.post('/', (req, res)=>
{
    var emp = new Employee ({
        name: req.body.name,
        position: req.body.postion,
        salary: req.body.salary,
        office: req.body.office,

    });
    emp.save((err, doc)=>{
        if (!err){
            res.send(doc);
        }
        else{
            console.log('there is an erronr in saving Employee' + JSON.stringify(err, undefined, 2));
        }
    });
    

}
);

//  for update we use put
router.put('/:id', (req, res) =>{
    if (!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No record for this id: ${req.params.id}`);
    var emp = new Employee ({
        name: req.body.name,
        position: req.body.postion,
        salary: req.body.salary,
        office: req.body.office,

    });
        
Employee.findByIdAndUpdate(req.params.id, { $set: emp}, {new: true}, (err, doc)=>{
    if (!err){
        res.send(doc);
    }
    else {
        console.log('Error in employee update' + JSON.stringify(err, undefined, 2));
    }
});
    

});

// to delete a user by id
router.delete('/:id', (req, res)=>{
    if (!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No record for this id: ${req.params.id}`);
    Employee.findByIdAndRemove(req.params.id,(err, doc) =>{
        if (!err){
            res.send(doc);
        }
        else{
            console.log('Error in employee delete' + JSON.stringify(err, undefined, 2));
        }
       });
});


module.exports = router;