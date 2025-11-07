
const express = require("express");

const app = express();
const porta = 3333;


function mostraHora(request, response) {
    const data = new Date();
    const opDate = { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' };
    const opTime = { hour: '2-digit', minute: '2-digit', second: '2-digit' };
    const dataFormatada = data.toLocaleDateString('pt-BR', opDate);
    const horaFormatada = data.toLocaleTimeString('pt-BR', opTime);
    response.setHeader('Content-Type', 'text/plain; charset=utf-8');
    response.send(`Olá, agora são ${horaFormatada} - ${dataFormatada}`);
}

function mostraPorta() {
    console.log("Servidor criado e rodando na porta: ", porta);
}

app.use("/hora2", mostraHora)
app.listen(porta, mostraPorta);
