"use strict";

const id = document.querySelector("#id"), // 질의 선택자
psword = document.querySelector("#psword"),
loginbtn = document.querySelector("button");

loginbtn.addEventListener("click", login);

function login(){
    const req = {
        id : id.value,
        password : psword.value
    };

    fetch("/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(req)
    }) 
}
