// server.js
// const express = require('express');
import e from 'express';
import axios from 'axios';
import cors from 'cors'
import bodyParser from 'body-parser';
import { createProxyMiddleware } from 'http-proxy-middleware';
const app = e();
const port = 5000;
app.use(cors());
// Middleware to parse JSON bodies
app.use(e.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use('/api', createProxyMiddleware({ target: 'https://ao.bot', changeOrigin: true }));
// app.options('*', (req, res) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
//   res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//   res.send();
// });
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

  return req.data || req
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
  console.log(res)
  return res?.data || res

}

app.post('/api/requestTrans', async (req, res) => {
  const { url, Auth } = req.body;
  if (!url || !Auth)
    res.json({ message: { "error": 'please provide url and Auth' } })
  let data = await Request(url, Auth)
  try {
    res.json({ message: { "data": data } })
  } catch (error) {
    res.json({ message: { "error": error } })
  }
});

app.post('/api/getData', async (req, res) => {
  const { id, Auth } = req.body;
  if (!id || !Auth)
    res.json({ message: { "error": 'please provide url and Auth' } })
  console.log(id, Auth)
  let data = await GetText(id, Auth)
  try {
    res.json({ message: { "data": data } })
  } catch (error) {
    res.json({ message: { "error": error } })
  }
});

app.post('/api/test', async (req, res) => {
  const { id, Auth } = req.body;
  if (!id || !Auth)
    res.json({ message: { "error": 'please provide url and Auth' } })
  else
    res.json({ message: { "message": { id, Auth } } })

});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

