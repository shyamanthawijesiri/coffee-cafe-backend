var fs = require('fs');
var path = require('path');
const multer  = require('multer');
// const upload = multer({ dest: 'uploads/' })

const Product = require('../models/Product');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/')
    },

    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + file.originalname;
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  });

const fileFilter = (req, file, cb) =>{
    if(file.mimetype ==='image/png') {
        cb(null, true);
    }else{
        cb(null, false);
        cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }

}

const upload = multer({ storage: storage, fileFilter: fileFilter })

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
const uploadImage = upload.single('img');

const addItem = async (req,res)=>{
    console.log(req.file);
    if(!req.body.name || !req.body.price || !req.file) return res.status(400).json({'message':'name and pice required'});
    const newItem = {
        name : req.body.name,
        price : req.body.price,
        image : req.file.filename


    };
    console.log(newItem);
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
    deleteItem,
    uploadImage

}