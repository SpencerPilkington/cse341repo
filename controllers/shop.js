const Product = require('../models/product');
//const Cart = require('../models/cart');

exports.getProducts = (req,res,next) => {
    Product.fetchAll(products => {
        res.render('pages/shop/product-list', {
            products: products,
            pageTitle: 'All Products',
            path: '/products'
        });
    });
};

exports.getProduct = (req,res,next) => {
    const productId = req.params.productId;
    Product.findById(productId, product => {
        res.render('pages/shop/product-detail', {
            product: product,
            pageTitle: product.title,
            path: '/products'
        });
    });
};

exports.getIndex = (req,res,next) => {
    Product.fetchAll(products => {
        res.render('pages/shop/index',{
            products: products,
            pageTitle: 'Home',
            path: '/pages/shop/index'
        });
    });
};
