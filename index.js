// server.js
// const express = require('express');
import e from 'express';
import axios from 'axios';
import cors from 'cors'
import bodyParser from 'body-parser';
const app = e();
const port = 5000;
app.use(cors());
// Middleware to parse JSON bodies
app.use(e.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.post('/api/ask', async (req, res) => {
  const { url, Auth } = req.body;

  res.json({ message: { url, Auth } })

});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

