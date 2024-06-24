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
const token = `02wQv02mBmqK-7REQJIWuPZ2kB45y4IVoPeAQU6LCLX_P3mziQ_RCeKwU6_tIclsKwu9NJ0Qw2IkG06TG3_pXSHwm48_8`

async function Request(url, Auth) {
  let data = ({
    "source_config": {
      "url": url
    }
  });

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://api.rev.ai/speechtotext/v1/jobs',
    headers: {
      'Authorization': `Bearer ${Auth}`,
      'Content-Type': 'application/json'
    },
    data: data
  };

  let req = await axios.request(config)

  return req.data
}

const GetText = async (id, Auth) => {
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `https://api.rev.ai/speechtotext/v1/jobs/${id}/transcript`,
    headers: {
      'Authorization': `Bearer ${Auth}`,
      'Accept': 'text/plain'
    }
  };
  let res = await axios.request(config)
  return res.data

}

app.post('/api/requestTrans', async (req, res) => {
  const { url, Auth } = req.body;
  let data = await Request(url, Auth)
  res.json({ message: { "data": data } })

});

app.get('/api/getData', async (req, res) => {
  const { id, Auth } = req.body;
  let data = await GetText(id, Auth)
  res.json({ message: { "data": data } })

});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

