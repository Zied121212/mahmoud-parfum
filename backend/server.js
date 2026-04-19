const express = require('express');
const cors = require('cors');
require('dotenv').config();

const sequelize = require('./config/database');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const notificationRoutes = require('./routes/notificationRoutes');

// Load models to ensure valid relationships
require('./models/User');
require('./models/Product');
require('./models/Order');
require('./models/Notification');

const seedDatabase = require('./seeder');

const app = express();

app.use(cors({ origin: '*' }));
app.use(express.json());

app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/notifications', notificationRoutes);

const PORT = process.env.PORT || 8080;

app.listen(PORT, '0.0.0.0', async () => {
  console.log(`Server is running on port ${PORT} (External)`);
  try {
    await sequelize.authenticate();
    console.log('PostgreSQL connected.');
    await sequelize.sync({ alter: true }); // similar to spring.jpa.hibernate.ddl-auto=update
    console.log('Database synchronized.');
    await seedDatabase();
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
});
// trigger reload
