const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

// MongoDB connection setup
const mongoURI = 'mongodb://localhost:27017/surya'; 

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('MongoDB connected');

   
    app.listen(3000, () => {
        console.log('Server is running on http://localhost:3000');
    });
})
.catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1); // 
});


app.get('/', (req, res) => {
    res.send('Server is running');
});

app.get('/test/companies/:companyname/categories/:categoryname/products', async (req, res) => {
    try {
        
        const products = [
            {
                productName: 'Laptop 1',
                price: 2236,
                rating: 4.7,
                discount: 63,
                availability: 'yes'
            },
            {
                productName: 'Laptop 13',
                price: 1244,
                rating: 4.5,
                discount: 45,
                availability: 'out-of-stock'
            },
            // you can also add more products
        ];

        res.json(products);
    } catch (err) {
        console.error('Error fetching products:', err);
        res.status(500).json({ error: 'Failed to fetch products' });
    }
});


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});
