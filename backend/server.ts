import express from 'express';
import bodyParser from 'body-parser';
import authRoutes from './routes/authroutes';  // Import the routes
import blogroutes from'./routes/blogroute';
import { sequelize } from './models'; // Assuming sequelize is initialized here
import initUserModel from './models/user';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(bodyParser.json()); // Or use express.json()
app.use(bodyParser.urlencoded({ extended: true }));
initUserModel(sequelize);

// Use authRoutes for authentication-related API calls
app.use('/auth', authRoutes);  // Prefix with /api/auth (e.g., /api/auth/register, /api/auth/login)
app.use('/blog',blogroutes);

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  
  // Sync the database with models
  try {
    await sequelize.sync();
    console.log("Database connected!");
  } catch (error) {
    console.error("Error connecting to the database", error);
  }
});
