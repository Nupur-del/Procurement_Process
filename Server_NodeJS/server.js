const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));

const login = require('./routes/login.route');
const order = require('./routes/order.route');
const allOrder = require('./routes/allOrders.route');
const budget = require('./routes/budget.route');
const invoice = require('./routes/invoice.route');
const Po = require('./routes/po.route');
const Purchase_order = require('./routes/purchase_order.route');
const item = require('./routes/item.route');
const initRoutes = require("./routes/upload.route");

app.get('/', function(req,res){
    res.send('Hello from server');
})
  
app.use('/users', login);
app.use('/order', order);
app.use('/orders', allOrder);
app.use('/budget',budget);
app.use('/invoice', invoice);
app.use('/Purchase', Po);
app.use('/Purchase_order', Purchase_order);
app.use('/item', item);
app.use('/api', initRoutes);

app.listen(PORT, function(){
    console.log('Server is up and running ' + PORT);
})