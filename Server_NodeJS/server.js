const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require("nodemailer");
const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));

app.post("/sendmail", (req, res) => {
    console.log("request came");
    let user = req.body;
    console.log(req.body);
    console.log(user);
    sendMail(user, info => {
      console.log(`The mail has been send 😃 and the id is ${info.messageId}`);
      res.send(info);
    });
  });
  
  async function sendMail(user, callback) {
    // create reusable transporter object using the default SMTP transport
    console.log(user);
    let transporter = nodemailer.createTransport({
       service: "gmail",
       auth: {
         user: user.email,
         pass: user.password
        }
    });
  
    let mailOptions = {
      from: `${user.user}<${user.email}>`, // sender address
      to: user.suppemail, // list of receivers
      subject: `Tracking Link for Purchase Order ${user.order_id}`, // Subject line
      html: `<h1>Hi ${user.name}</h1><br>
      <h4>Thanks for placing  order</h4>
      <h4>Order Status: ${user.status}</h4>
      <h4>You can track your order with following link:</h4>
      <a [href]='${user.tracking_link}'>${user.tracking_link}</a>`
    };

    // send mail with defined transport object
    let info = await transporter.sendMail(mailOptions);
    callback(info);
  }

const login = require('./routes/login.route');
const order = require('./routes/order.route');
const allOrder = require('./routes/allOrders.route');
const budget = require('./routes/budget.route');
const invoice = require('./routes/invoice.route');
const Po = require('./routes/po.route');
const Purchase_order = require('./routes/purchase_order.route');
const item = require('./routes/item.route');
const initRoutes = require("./routes/upload.route");
const Cities = require("./routes/cities.route");
const Department = require("./routes/department.route");
const supplier = require("./routes/supplier_login.route");
const brand = require("./routes/brand.route");
const invoice_update = require('./routes/invoice_up.route');
const budgetUpdate = require("./routes/budget_update.route");
const category = require("./routes/datacategory.route");

app.get('/', function(req,res){
    res.send('Hello from server');
})
app.use(express.static('public'));
app.use('/images', express.static(__dirname + '/uploads'));
  
app.use('/users', login);
app.use('/supplier', supplier);
app.use('/order', order);
app.use('/orders', allOrder);
app.use('/brand', brand);
app.use('/invoice_up', invoice_update);
app.use('/budget',budget);
app.use('/invoice', invoice);
app.use('/Purchase', Po);
app.use('/category', category);
app.use('/cities', Cities);
app.use('/department', Department);
app.use('/Purchase_order', Purchase_order);
app.use('/item', item);
app.use('/api', initRoutes);
app.use('/budgets', budgetUpdate);

app.listen(PORT, function(){
    console.log('Server is up and running ' + PORT);
})