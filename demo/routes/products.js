const express = require('express');
const router = express.Router();
const axios = require('axios');
const Product = require('../models/Product');


router.get('/:category/products', async (req, res) => {
    const { category } = req.params;
    const { top, minPrice, maxPrice, sort } = req.query;

   
    const queryParams = {
        top: top || 10,
        minPrice: minPrice || 1,
        maxPrice: maxPrice || 10000,
        sort: sort || 'rating_desc'  
    };

    try {
        
        const response = await axios.get(`http://20.244.56.144/test/companies/AMZ/categories/${category}/products`, {
            params: queryParams
        });

        
        const formattedProducts = response.data.map((product, index) => ({
            productId: `${product.productName}_${index}`,  // Generate unique ID
            productName: product.productName,
            price: product.price,
            rating: product.rating,
            discount: product.discount,
            availability: product.availability
        }));

    
        await Product.insertMany(formattedProducts);

    
        res.json(formattedProducts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


router.get('/:category/products/:productId', async (req, res) => {
    const { productId } = req.params;

    try {
        
        const product = await Product.findOne({ productId });

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
