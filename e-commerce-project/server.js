import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import constDB from './config/db.js';
import authRoutes from './routes/authRoute.js';


dotenv.config();

constDB();

const app = express();

app.use(express.json())
app.use(morgan('dev'))

app.use("/api/v1/auth",authRoutes);

app.get('/', (req, res) => {
  res.send("<h1>'Welcome to E-commerce app'</h1>");
});
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server Running on ${PORT}`.bgCyan.white);
});
