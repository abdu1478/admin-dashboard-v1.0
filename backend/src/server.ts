import express, { Request, Response, NextFunction, RequestHandler } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import {IUser} from "@/models/User"
import Invoices from './models/Invoices';

// Load environment variables
dotenv.config();

// Import User model
import User from './models/User';

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("FATAL ERROR: MONGO_URI is not defined in .env file");
  process.exit(1); // Exit the process with an error code
}

// Middleware
app.use(cors()); 
app.use(express.json()); 

// Database Connection
mongoose.connect(MONGO_URI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch(err => {
    console.error("MongoDB connection error:", err);
    process.exit(1); 
  });

// Basic Route
app.get('/', (req: Request, res: Response) => {
  res.send('Backend server is running!');
});

// get user login count
app.get('/api/users/:email', (async (req: Request, res: Response) => {
  try {
    const {email} = req.params;

      const user = await User.findOne({ email: req.params.email }).select("loginCount id ").exec();

      if(!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      res.status(200).json(user);
    }catch (err: any) {
      console.error(err);
      res.status(500).json({ message: 'Internal Server Error', error: err.message });
    }
  }) as RequestHandler)

// Login Route (Relying on Express 5 async error handling)
app.post('/api/users', (async (req: Request, res: Response) => {
  try{
    const usersData = req.body as IUser; 

  if(!usersData) {
    return res.status(400).json({ message: "No user data provided" });
  }
  const updateUser = await User.findOneAndUpdate(
    { id: usersData.id }, 
    { $set: {
            email: usersData.email,
            last_sign_in: usersData.last_sign_in,
            role: usersData.role,
          },
          $inc: { loginCount: 1 }, }, 
    { new: true, upsert: true, setDefaultsOnInsert: true } // Create if not exists
  );
  res.status(200).json(updateUser);
  const { id, email, createdAt, last_sign_in, role  } = req.body;
  }catch (err: any){
    console.error("Error in /api/users:", err);
    res.status(500).json({ message: 'Internal Server Error', error: err.message });
  }
  
}) as RequestHandler )

// Invoice data
app.get('/api/invoices', (async (req: Request, res: Response) => {
  try {
    const invoices = await Invoices.find({}).exec();
    if(!invoices || invoices.length === 0) {
      return res.status(404).json({ message: "No invoices found" });
    }
    
    res.status(200).json(invoices);
  } catch (err: any) {
    console.error("Error in /api/billing:", err);
    res.status(500).json({ message: 'Internal Server Error', error: err.message });
  }
}) as RequestHandler)

// Error Handling Middleware (Improved to send JSON response)
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error("Error caught by middleware:", err); 
  res.status(500).json({ message: 'Internal Server Error', error: err.message });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
