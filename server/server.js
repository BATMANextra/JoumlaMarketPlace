const express = require('express');
const app = express();
app.use(express.json());
require('dotenv').config();
const dbConfig = require('./config/dbConfig');
const port = process.env.PORT || 5000;

const userRoute = require('./routes/usersRoute');
const productsRoute = require('./routes/productsRoute');
const ordersRoute = require('./routes/ordersRoute');
const notificationRoute = require('./routes/notificationRoute');
app.use('/api/users', userRoute);
app.use('/api/products', productsRoute);
app.use('/api/orders', ordersRoute);
app.use('/api/notifications', notificationRoute);
app.listen(port, () =>
  console.log(`Node/Express server starting on port ${port}`)
);
