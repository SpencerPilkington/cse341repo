const Product = require('../models/product');
const {validationResult} = require('express-validator/check');
exports.getAddProduct = (req,res,next) => {
    res.render('pages/admin/edit-product', {
        pageTitle: 'Add Product',
        path: '/pages/admin/add-product',
        editing: false,
        hasError: false,
        errorMessage: null,
        validationErrors: []
    });
};

exports.postAddProduct = (req,res,next) => {
    const title= req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    errors = validationResult(req);
    
    if(!errors.isEmpty()) {
        return res.status(422).render('pages/admin/edit-product',{
            pageTitle: 'Add Product',
            path: 'pages/admin/add-product',
            editing:false,
            hasError: true,
            product: {
                title:title,
                imageUrl:imageUrl,
                price:price,
                description:description
            },
            errorMessage: errors.array()[0].msg,
            validationErrors: errors.array()
        });
    }
    req.user
        const product = new Product({
            title: title,
            price: price,
            description: description,
            imageUrl: imageUrl,
            userId: req.user
            });
    product.save()
    .then(result => {
        console.log('Product Created!');
        res.redirect('/shop');
    })
    .catch(err => {
        console.log(err);
    });
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
            product: product,
            hasError: false,
            errorMessage: null,
            validationErrors: []
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
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(422).render('pages/admin/edit-product',{
            pageTitle: 'Edit Product',
            path: 'pages/admin/edit-product',
            editing:true,
            hasError: true,
            product: {
                title:updatedTitle,
                imageUrl:updatedImageUrl,
                price:updatedPrice,
                description:updatedDescription,
                _id: productId
            },
            errorMessage: errors.array()[0].msg,
            validationErrors: errors.array()
        });
    }
        Product.findById(productId)
        .then(product => {
            if(product.userId.toString() !== req.user._id.toString()) {
            return res.redirect('/shop');
        }
         product.title = updatedTitle,
         product.imageUrl = updatedImageUrl,
         product.description = updatedDescription,
         product.price = updatedPrice;
         return product
         .save()
         .then(result => {
            console.log('UPDATED PRODUCT!');
            res.redirect('/admin/products');
        });
    })
    .catch(err => console.log(err));
    
};

exports.getProducts = (req,res,next) => {
    Product.find({userId: req.user._id})
    .then(products => {
        res.render('pages/admin/products', {
            products:products,
            pageTitle: 'Admin Products',
            path: '/pages/admin/products'
        });
    })
    .catch(err => console.log(err));
};

exports.postDeleteProduct = (req,res,next) => {
    const productId = req.body.productId;
    Product.deleteOne({_id: productId, userId: req.user._id})
    .then(() => {
        console.log('DESTROYED PRODUCT');
        res.redirect('/admin/products');
    })
    .catch(err => console.log(err));
};