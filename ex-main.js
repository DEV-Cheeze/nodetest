const express = require('express');
const server = express();
var fs = require('fs');
var extension = require('./extensions');
var requestIp = require('request-ip') //requestIp 모듈 사용 (미들웨어)
var session = require('express-session');
var con = require('./dbconnect');
const home = require("./routes/home/route");  //해당 디렉토리에 있는 index.js를 가르킴


server.set("views", `${__dirname}/views`); //화면 뷰를 관리해줄 파일이 저장될 폴더 이름
server.set("view engine", "ejs"); //어떤 파일 형식으로 해석할 것인가? (ejs 모듈 필요)

server.use(express.urlencoded({extended: true})); // use - 미들웨어를 등록해줌
server.use("/", home); //home에 있는 index.js파일 안에 get("/")으로 된 함수가 콜백되어 실행됨.

con.connect(); //db 서버에 연결
//get(path, callback)...
//path는 라우팅 (페이지의 경로) 위치를 지정
//ex) path가 /home인경우 
//localhost:3000/home 으로 들어가면 get 함수에 있는
//callback 함수가 실행됨.

// Route Params
// :id/:id2 형식으로 지정 시
// /2/3 으로 경로를 들어갈 경우 해당 파라미터가 객체화 됨
// 결과: {id: 2, id: 3}
// 동적 라우팅에는 :path 형식으로 붙인다~
server.get("/contents", (req, res) => { //게시물 사이트
    fs.readdir(`${__dirname}/contents`, 'utf8', (err, files) => {
        var list = extension.getLists(files);
        if(files.length){
            contents = extension.createDocs(
                `<h1>현재 ${files.length}개의 게시글이 있습니다.</h1>
                ${list}
                </br>
                <a href="/create/write"><input type="button" value="작성하기"></a> 
                <a href="/"><input type="button" value="홈으로"></a>
                `
                );
        }else{
            contents = extension.createDocs(
                `<h1>이럴수가.. 게시물이 없어요..</h1>
                ${list}
                </br>
                <a href="/create"><input type="button" value="작성하기"></a> 
                <a href="/"><input type="button" value="홈으로"></a>
                `
                );
        }
        res.send(contents);
    });
    
});



server.post("/create/complete", (req, res) =>{
    var link = req.body;
    if(link.title === "" || link.description === ""){
        res.redirect("/contents");
        res.end();
    }else{
        fs.writeFile(`${__dirname}/contents/${link.title}`, link.description, 'utf8', () =>{
            console.log("파일 작성 완료.");
            res.redirect("/contents");
            res.end();
        })
    }
})

server.get("/contents/:id", (req, res) => {
    var param = req.params
    fs.readFile(`${__dirname}/contents/${param.id}`, (err, data) =>
    {
        var docs = extension.createDocs(`
        <h2>${param.id}</h2>
        </br>
        ${data}`);
        res.send(docs);
    })
})
module.exports = server;

 