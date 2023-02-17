//index.js
const express = require('express');
const path = require('path');
const router = express.Router();




// show index page
router.get('/',(req,res)=>{
    //res.sendFile(path.join(__dirname,'../public', 'index.html'));
    // handlebars 뷰 엔진으로 응답처리
    res.render('index', {title: 'index'});
});


module.exports = router;