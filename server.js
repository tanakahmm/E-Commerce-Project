import express from 'express';
import colors from 'colors';
const app = express();
import dotenv from 'dotenv';

dotenv.config();

app.get('/', (req, res) => {
  res.send("<h1>'Welcome to E-commerce app'</h1>");
});
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server Running on ${PORT}`.bgCyan.white);
});
