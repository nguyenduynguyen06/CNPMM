require('dotenv').config();
const express = require('express');
const app = express();
const connect2DB = require('./config/data');
const routerUser = require('./Router/UserRouter');
const routerUpload = require('./Router/UploadRouter')
const routerProduct = require('./Router/ProductRouter')
const routerOrder = require('./Router/OrderRouter')
const bodyParser = require('body-parser');
const path = require('path')
const routerCategory = require('./Router/CategoryRouter')
const server = require('http').createServer(app);
const cookieParser = require('cookie-parser')
const cors = require('cors');


app.use(cors({
    origin: true, 
    credentials: true, 
  }));
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Credentials', true);
    next();
})
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', routerUpload);
app.use('/api/user', routerUser);
app.use('/api/product', routerProduct);
app.use('/api/category',routerCategory);
app.use('/api/order',routerOrder)
connect2DB();
const PORT = process.env.PORT 
server.listen(PORT, () => {
    console.log(`Server is now running on PORT: ${PORT}`);
})