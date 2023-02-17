const express = require('express');
const path = require('path');
const logger=require('morgan');//로그출력기
const {engine} =require('express-handlebars');
const bodyParser=require('body-parser');//폼처리기
const oracledb=require('./models/Oracle');

//라우팅 외부 작성
const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');
const aboutRouter = require('./routes/about');

const app = express();
const port = process.env.PORT || 3000;



//view템프릿 엔진 설정
app.engine('hbs',engine({ //hbs엔진으로 이름
    extname:'.hbs',
    defaultLayout:'layout', //디폴트 설정안하면 메인으로 뜬다
    helpers: {
        section: function(name, options) {
            if(!this._sections) this._sections = {}
            this._sections[name] = options.fn(this)
            return null
        },
    },

}));

app.set('views',path.join(__dirname,'views'));
app.set('view engine','hbs');

//라우팅을 거치지 않고 직접 호출해서 응답
app.use(express.static(path.join(__dirname,'static')));

//로그설정
app.use(logger('dev'));

//미들웨어 등록
app.use(express.json());

app.use(express.urlencoded({extended: false}));//전송데이터에 대한 urlencoding위한 설정
app.use(bodyParser.json()); //전송된 폼데이터는json형식
//app.use(bodyParser.raw()); //
//app.use(bodyParser.text()); //enctype이 text/plain일때 필요 비추
oracledb.initConn();//오라클 instant client 초기화

// index에 대한 route handler 지정
app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/about', aboutRouter);

//404처리
app.use((req, res)=>{
    res.status(404);
    res.sendFile(path.join(__dirname,'public','404.html'));


});

//500처리
app.use((err,req, res,next)=>{
    console.log(err);
    res.status(500);
    res.sendFile(path.join(__dirname,'public','500.html'));


});


app.listen(port,() =>{
    console.log('express 서버가 실행중... 중지하혀면 ctrl+c를 눌러주세요!');
});

//라우트 메소드는 HTTP 메소드 중 하나로부터 파생되며, express 클래스의 인스턴스에 연결됩니다.
// 다음 코드는 앱의 루트에 대한 GET 및 POST 메소드에 대해 정의된 라우트의 예입니다.