const home =  (req, res) => {
    //console.log(requestIp.getClientIp(req)); //해당 경로로 접속한 클라이언트의 IP주소를 반환.
    res.render("home/main");
}

const login = (req, res) => {
    console.log("gd");
    res.render("home/login");
    
}

module.exports = {
    home, login
}