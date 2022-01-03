
const Product = require('../models/Product');

const getAllItem = async (req,res)=>{
    const result = await Product.find();
    return res.json(result);
}

const getItem = async (req,res)=>{
    const id = !req.params?.id;
    if(!id) return res.sendStatus(203);
    const result =  await Product.findById(id).exec();
    return res.status(200).json(result);
}

const addItem = async (req,res)=>{
    if(!req.body.name || !req.body.price) return res.status(400).json({'message':'name and pice required'});
    const newItem = {
        name : req.body.name,
        price : req.body.price
    };
    const result = await Product.create(newItem);
    return res.status(201).json(result);
}

const updateItem = async (req,res)=>{
    const id = req.params?.id
    if(!id) return res.sendStatus(203);
    const currentItem = await Product.findById(id).exec();
    if(req.body.name) currentItem.name = req.body.name;
    if(req.body.price) currentItem.price = req.body.price;

    const result =  await currentItem.save();
    return res.status(200).json({"message":"successfull updated the item"});
    
}

const deleteItem = async (req,res)=>{
    const id = req.params?.id
    if(!id) return res.sendStatus(203);
    const result = await Product.findByIdAndDelete(id);
    return res.status(200).json({"messasge":"successfully deleted the item"});
}

module.exports = {
    getAllItem,
    getItem,
    addItem,
    updateItem,
    deleteItem

}