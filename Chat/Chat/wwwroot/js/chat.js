"use strict";

var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();

document.getElementById("btnEnviarMensagem").disabled = true;

connection.on("ReceberMensagem", function (usuario, mensagem)
{
    var today = new Date();
    var time = today.getHours() + ":" + today.getMinutes();

    var msg = mensagem.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    var encodedMsg = usuario + ": " + msg + " - " + time;
    var li = document.createElement("li");
    li.textContent = encodedMsg;            

    if (msg != "" && usuario != "")
    {
        document.getElementById("listaMensagem").appendChild(li);        
    }
});

connection.start().then(function () {
    document.getElementById("btnEnviarMensagem").disabled = false;
}).catch(function (err) {
    return console.error(err.toString());
});

document.getElementById("btnEnviarMensagem").addEventListener("click", function (event) {
    var user = document.getElementById("txtUsuario").value;
    var message = document.getElementById("txtMensagem").value;
    connection.invoke("EnviarMensagem", user, message).catch(function (err) {
        return console.error(err.toString());
    });
    event.preventDefault();
});