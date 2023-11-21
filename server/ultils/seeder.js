const Product = require('../Model/ProductModel');
const dotenv = require('dotenv');
const connect2DB = require('../config/data');

const products = require('../data/product.json');


dotenv.config({ path: 'backend/config/config.env' })

connect2DB();

const seedProducts = async () => {
    try {

        await Product.deleteMany();
        console.log('Products are deleted');

        await Product.insertMany(products)
        console.log('All Products are added.')

        process.exit();

    } catch (error) {
        console.log(error.message);
        process.exit();
    }
}

seedProducts()