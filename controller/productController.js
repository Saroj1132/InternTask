const Product = require('../models/produc_Model')
const ErrorHandler = require('../utils/errorhandler')
const catchAsyncErrors = require('../middleware/catchAsyncErrors')

module.exports = {

  //create Product

  createProduct: catchAsyncErrors(async (req, res, next) => {
    const { name, description, price, category } = req.body
    const _product = new Product({
      name,
      description,
      price,
      category
    })
    await _product.save().then((__product) => {
      res.status(200).json({
        success: true,
        __product
      })
    })
  }),

  //find all product

  getAllProducts: catchAsyncErrors(async (req, res) => {
    await Product.find().exec()
      .then(products => {
        res.status(200).json({
          success: true,
          products,
        });
      })

  }),



  //get Product 

  getProductDetails: catchAsyncErrors(async (req, res, next) => {
    await Product.findOne({ _id: req.params.id }).exec().then((_product) => {
      if (_product) {
        res.status(200).json({
          success: true,
          _product
        })
      } else {
        return next(new ErrorHandler("Product not found", 404));
      }

    })
  }),

  //update product

  updateProduct: catchAsyncErrors(async (req, res, next) => {
    const { name, description, price, category } = req.body

    await Product.findOne({ _id: req.params.id }).exec().then((_product) => {
      if (_product) {
        Product.findByIdAndUpdate({ _id: req.params.id }, {
          name,
          description,
          price,
          category
        }).exec()
          .then((__product) => {
            Product.find({_id: req.params.id}).exec().then((_productdata)=>{
              res.status(200).json({
                success: true,
                _productdata,
              });
            })
          })

      } else {
        return next(new ErrorHandler("Product not found", 404));
      }

    })

  }),

  //delete product

  deleteProduct: catchAsyncErrors(async (req, res, next) => {
    await Product.findById(req.params.id).exec().then((_product) => {
      if (_product) {
        Product.findByIdAndDelete({ _id: req.params.id })
          .exec().then((_productdelete) => {
            res.status(200).json({
              success: "Delete sucessfully!!"
            })
          })
      } else {
        return next(new ErrorHandler("Product not found", 404));
      }
    })
  }),

  
}