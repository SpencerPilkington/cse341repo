const Product = require('../models/product');

exports.getAddProduct = (req,res,next) => {
    res.render('pages/admin/edit-product', {
        pageTitle: 'Add Product',
        path: '/pages/admin/add-product',
        editing: false
    });
};

exports.postAddProduct = (req,res,next) => {
    const title= req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    req.user
    const product = new Product({
         title: title,
         imageUrl: imageUrl,
         description: description,
         price: price,
         userId: req.user
    });
    product.save()
    .then(result => {
    res.redirect('/shop');
    })
    .catch(err => {
        console.log(err);
    });
};

exports.getProducts = (req,res,next) => {
    Product.find()
    .then(products => {
        res.render('pages/admin/products', {
            products:products,
            pageTitle: 'Admin Products',
            path: '/pages/admin/products'
        });

    })
    .catch(err => console.log(err));
};

exports.getEditProduct = (req,res,next) => {
    const editMode = req.query.edit;
    if (!editMode) {
        return res.redirect('/home');
    }
    const productId = req.params.productId;
    Product.findById(productId)
    .then(product => {
        if (!product) {
            return res.redirect('home')
        }
        res.render('pages/admin/edit-product', {
            pageTitle: 'Edit Product',
            path: '/pages/admin/edit-product',
            editing: editMode,
            product: product
        });
    })
    .catch(err => console.log(err));
};

exports.postEditProduct = (req,res,next) => {
    const productId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedPrice = req.body.price;
    const updatedImageUrl = req.body.imageUrl;
    const updatedDescription = req.body.description;
    Product.findById(productId).then(product => {
        product.title = updatedTitle,
         product.imageUrl = updatedImageUrl,
         product.description = updatedDescription,
         product.price = updatedPrice;
         return product
         .save()
    })
    .then(result => {
        res.redirect('/admin/products');
    })
    .catch(err => console.log(err));
    
};


exports.postDeleteProduct = (req,res,next) => {
    const productId = req.body.productId;
    Product.findByIdAndRemove(productId)
    .then(() => {
        res.redirect('/admin/products');
    })
    .catch(err => console.log(err));
};