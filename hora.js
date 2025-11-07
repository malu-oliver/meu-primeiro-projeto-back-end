const express = require("express");

const app = express();
const porta = 3333;


function mostraHora(request, response) {

const data = new Date()
const hora = data.toLocaleTimeString('pt-BR')

response.send("Olá, agora são " +   hora + " - " + " e a data é " + data.toLocaleDateString('pt-BR'))

}

function mostraPorta() {
    console.log("Servidor criado e rodando na porta: ", porta);
}

app.use("/hora", mostraHora)
app.listen(porta, mostraPorta);

