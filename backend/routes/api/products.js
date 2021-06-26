var express = require('express');
var router = express.Router();
var validateProduct = require('../../middlewares/validateProduct');
var auth = require('../../middlewares/auth');
var admin = require('../../middlewares/admin');
var {Product} = require('../../models/product');


// Get Products
router.get("/",  async (req, res) => {
    //console.log(req.user);
    let page = Number(req.query.page ? req.query.page : 1);
    let perPage = Number(req.query.perPage ? req.query.perPage : 10);
    skipRecords = perPage * (page -1 );
    let product = await Product.find().skip(skipRecords).limit(perPage);
    let total = await Product.countDocuments();
    return res.send({product, total});
});

// Get single Products
router.get("/:id", async (req, res) => {
    try {
        let product = await Product.findById(req.params.id);
        if (!product) return res.status(400).send("Product with given ID is Not Available.")
        return res.send(product);
    } catch (error) {
        return res.status(400).send("Invalid ID");
    }
});

// Edit Products
router.put("/:id",validateProduct,auth, admin, async (req, res) => {
    let product = await Product.findById(req.params.id);
    product.name = req.body.name;
    product.price = req.body.price;
    await product.save();
    return res.send(product);
});

// Create New Products
router.post("/" , validateProduct ,auth,  async (req, res) => {
    let product = new Product();
    product.name = req.body.name;
    product.price = req.body.price;
    await product.save();
    return res.send(product);
});

// Delete Products
router.delete("/:id",auth, admin, async (req, res) => {
    let product = await Product.findByIdAndDelete(req.params.id);
    return res.send(product);
});

module.exports = router;