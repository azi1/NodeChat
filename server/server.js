
const path = require('path');
const express = require('express');
require('../config/config');

const publicPath = path.join(__dirname, '../public');
console.log(publicPath);
const port  = process.env.PORT;
const app = express();
app.use(express.static(publicPath));








app.listen(port,()=>{
    console.log(`SERVER is up on ${port}`);
});