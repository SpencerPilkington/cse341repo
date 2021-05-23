const Product = require('../models/product');


exports.getProducts = (req,res,next) => {
    Product.find()
    .then(products => {
        res.render('pages/shop/product-list', {
            products: products,
            pageTitle: 'All Products',
            path: '/products',
            isAuthenticated: req.session.isLoggedIn
        });
    })
    .catch(err => {
        console.log(err);
    });
};

exports.getProduct = (req,res,next) => {
    const productId = req.params.productId;
    Product.findById(productId)
    .then(product => {
        res.render('pages/shop/product-detail', {
            product: product,
            pageTitle: product.title,
            path: '/products',
            isAuthenticated: req.session.isLoggedIn
        });
    })
    .catch(err => console.log(err));
};

exports.getIndex = (req,res,next) => {
    Product.find()
    .then(products => {
        res.render('pages/shop/index',{
            products: products,
            pageTitle: 'Home',
            path: '/pages/shop/index'
        });
    })
    .catch(err => console.log(err));
};

exports.getCart = (req, res, next) => {
    req.user
    .populate('cart.items.productId')
    .execPopulate()
    .then(user => {
        const products = user.cart.items;
        res.render('pages/shop/cart', {
            path: '/cart',
            pageTitle: 'Cart',
            products: products
        });
    })
    .catch(err => console.log(err));
};

exports.postCart = (req, res, next) => {
    const productId = req.body.productId;
    Product.findById(productId).then(product => {
        return req.user.addToCart(product);
    })
    .then(result => {
        console.log(result);
        res.redirect('/cart');
    });
};

exports.postCartDeleteProduct = (req, res, next) => {
    const productId = req.body.productId;
    req.user
        .removeFromCart(productId)
        .then(result => {
            res.redirect('/cart');
        })
        .catch(err => console.log(err));
};