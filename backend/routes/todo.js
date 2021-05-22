const mongoose=require("mongoose");
const Joi=require('joi');
const express=require("express");
const router=express.Router();

const Todo=mongoose.model("Todo",new mongoose.Schema({
    text:{
        type:String,
        required:true,
        minlength:4,
        maxlength:16
    }
}));

router.get('/',async(req,res)=>{
    const todo=await Todo.find();
    res.send(todo)
});

router.post('/',async(req,res)=>{
    const {error}=validateTodo(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let todo=new Todo({text:req.body.text});
    todo= await todo.save();
    res.send(todo);
});

router.put('/:id',async(req,res)=>{
    const {error}=validateTodo(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const todo=await Todo.findByIdAndUpdate(req.params.id,{text:req.body.text},{
        new:true
    });
    if(!todo) return res.status(404).send("the given id was not found");
    res.send(todo);
});
router.delete('/:id',async(req,res)=>{
    const todo=await Todo.findByIdAndRemove(req.params.id);
    if(!todo) return res.status(404).send("The given id was not found");

    res.send(todo);
});

router.get('/:id',async(req,res)=>{
     const todo=await Todo.findById(req.params.id);
     if(!todo) return res.status(404).send("the given id was not found");
     res.send(todo)
})


function validateTodo(todo) {
    const schema={
        text:Joi.string().min(4).max(16).required() 
    }
     return Joi.validate(todo,schema) 
}
module.exports=router