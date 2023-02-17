const express = require('express');
const path = require('path');
const Member = require('../models/Member');

const router = express.Router();

router.get('/join',(req,res)=>{
    //res.sendFile(path.join(__dirname,'../public', 'join.html'));
    res.render('join', {title: '회원가입'});
});

router.post('/join',(req,res,next)=>{
    //res.sendFile(path.join(__dirname,'../public', 'join.html'));
    let {uid,pwd,pwd2,name,email} =req.body;
    new Member(uid,pwd,name,email).insert();
    res.redirect(303,'/member/login');
});

router.get('/login',(req,res)=>{
    //res.sendFile(path.join(__dirname,'../public', 'login.html'));
    res.render('login', {title: '로그인'});
});

router.get('/myinfo',(req,res)=>{
    //res.sendFile(path.join(__dirname,'../public', 'myinfo.html'));
    res.render('myinfo', {title: '회원정보'});
});
router.post('/join',(req,res,next)=>{
    let {userid, passwd, name, email} = req.body;
    console.log(userid, passwd, name, email);

    new Member(userid, passwd, name, email).insert();

    res.redirect(304, '/');
});
module.exports = router;