// IMPORTING MODULES
import express from "express";
const app = express();

// USING MIDDLEWARE
app.use(express.json());

// ENDPOINTS
app.get('/', (req, res) => {
  res.send("Hello world");
});

// INITIATE SERVER
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`server is listening on port ${PORT}`));