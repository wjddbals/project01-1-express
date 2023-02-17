//Member.js
const oracledb = require('../models/Oracle');

class Member{
    insertsql='insert into Member(mno, userid, passwd, name, email) '+' values(mno.nextval, :1, :2, :3, :4)';
    // 생성자 정의 - 변수 초기화
    // 즉, 매개변수로 전달된 값을 클래스 멤버변수에 대입함
    constructor(userid, passwd, name, email) {
        this.userid = userid;
        this.passwd = passwd;
        this.name = name;
        this.email = email;
    }
    // 회원정보 저장
    async insert(){
        // 데이터베이스 처리 - sungjuk 테이블에 insert
        let conn = null;
        let params = [this.userid, this.passwd, this.name, this.email];

        try {
            conn = await oracledb.makeConn();
            let result = conn.execute(this.insertsql, params);
            await conn.commit();
            if(result.rowsAffected>0) console.log('회원정보 저장성공');


        } catch (ex) {console.log(ex);}

        finally { await oracledb.closeConn(conn);}
    }


}

module.exports = Member;