const mongoose = require("mongoose");
const multer = require('multer');

const Product = require("./model");


  var uploadFile = (req, res, next) => {
    const product = new Product({
      _id: new mongoose.Types.ObjectId(),
      name: req.body.name,
      price: req.body.price,
      productImage: req.file.path 
    });
    product
      .save()
      .then(result => {
        console.log(result);
        res.status(201).json({
          message: "Created product successfully",
          createdProduct: {
              name: result.name,
              price: result.price,
              _id: result._id,
              request: {
                  type: 'GET',
                  url: "http://localhost:3003/testcode/getimage/" + result._id
              }
          }
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  };

  let getAllFiles = (req, res, next) => {
    Product.find()
      .select("name price _id productImage")
      .exec()
      .then(docs => {
        const response = {
          count: docs.length,
          products: docs.map(doc => {
            return {
              name: doc.name,
              price: doc.price,
              productImage: doc.productImage,
              _id: doc._id,
              request: {
                type: "GET",
                url: "http://localhost:3003/" + doc.productImage
              }
            };
          })
        };
        //   if (docs.length >= 0) {
        res.status(200).json(response);
        //   } else {
        //       res.status(404).json({
        //           message: 'No entries found'
        //       });
        //   }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  };

  let getImageOnId  = (req, res, next) => {
    const id = req.params.productId;
    Product.findById(id)
      .select('name price _id productImage')
      .exec()
      .then(doc => {
        console.log("From database", doc);
        if (doc) {
          res.status(200).json({
              product: doc,
              request: {
                  type: 'GET',
                  url: "http://localhost:3003/" + doc.productImage
              }
          });
        } else {
          res
            .status(404)
            .json({ message: "No valid entry found for provided ID" });
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
      });
  };

  module.exports  = {
    uploadFile,
    getAllFiles,
    getImageOnId
  };