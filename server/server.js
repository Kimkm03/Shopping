const express = require('express');
const cors = require('cors'); // cors
const app = express();
const test = require('.//Router/test');

app.use('/', test);
app.use(cors({
    origin: 'http://localhost:3000', // 허용할 origin
    methods: 'GET,POST', // 허용할 HTTP 메소드
    allowedHeaders: 'Content-Type, Authorization', // 허용할 헤더
  }));

app.listen(8080, ()=>{console.log(`서버가 8080 포트에서 실행 중입니다.`)});