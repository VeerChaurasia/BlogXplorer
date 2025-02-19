import express from 'express';
import bodyParser from 'body-parser';
import authRoutes from './routes/authroutes';  // Import the routes
import blogroutes from'./routes/blogroute';
import { sequelize } from './models'; // Assuming sequelize is initialized here
import initUserModel from './models/user';
import dotenv from 'dotenv';
import cors from 'cors';



const app = express();

app.use(cors({
  origin: 'http://localhost:5173', // Change this to match your frontend port
  credentials: true
}));
// Load environment variables
dotenv.config();

// Middleware
app.use(bodyParser.json()); // Or use express.json()
app.use(bodyParser.urlencoded({ extended: true }));
initUserModel(sequelize);

// Use authRoutes for authentication-related API calls
app.use('/auth', authRoutes);  
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
