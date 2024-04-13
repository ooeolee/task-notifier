const express = require('express');
const https = require('https');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 4000;

const options = {
  key: fs.readFileSync('./localhost.key'),
  cert: fs.readFileSync('./localhost.crt'),
  requestCert: false,
  rejectUnauthorized: false
};

const server = https.createServer(options, app);




// 루트 경로에 대한 GET 요청 처리

// /renderer.js 경로에 대한 GET 요청 처리

app.get('/renderer.js', (req, res) => {
  const filePath = path.join(__dirname, 'renderer.js');
  
  // 파일을 읽어 응답으로 전송
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.status(500).send('Internal Server Error');
      return;
    }
    res.setHeader('Content-Type', 'text/javascript');
    res.send(data);
  });
});
app.get('/screen.js', (req, res) => {
  const filePath = path.join(__dirname, 'screen.js');
  
  // 파일을 읽어 응답으로 전송
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.status(500).send('Internal Server Error');
      return;
    }
    res.setHeader('Content-Type', 'text/javascript');
    res.send(data);
  });
});
app.get('/clock.js', (req, res) => {
  const filePath = path.join(__dirname, 'clock.js');
  
  // 파일을 읽어 응답으로 전송
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.status(500).send('Internal Server Error');
      return;
    }
    res.setHeader('Content-Type', 'text/javascript');
    res.send(data);
  });
});
app.get('/notify.js', (req, res) => {
  const filePath = path.join(__dirname, 'notify.js');
  
  // 파일을 읽어 응답으로 전송
  fs.readFile(filePath, (err, data) => {  
    if (err) {
      res.status(500).send('Internal Server Error');
      return;
    }
    res.setHeader('Content-Type', 'text/javascript');
    res.send(data);
  });
});
app.get('/pomodoro.js', (req, res) => {
  const filePath = path.join(__dirname, 'pomodoro.js');
  
  // 파일을 읽어 응답으로 전송
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.status(500).send('Internal Server Error');
      return;
    }
    res.setHeader('Content-Type', 'text/javascript');
    res.send(data);
  });
});
app.get('/index.css', (req, res) => {
  const filePath = path.join(__dirname, 'index.css');
  
  // 파일을 읽어 응답으로 전송
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.status(500).send('Internal Server Error');
      return;
    }
    res.setHeader('Content-Type', 'text/css');
    res.send(data);
  });
});
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});





server.listen(port, () => {
  console.log(`Server is running at https://localhost:${port}`);
});
