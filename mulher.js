const express = require("express");
const router = express.Router();

const app = express();
const porta = 3333;

function mostraMulher(request,response) {
    response.json({
        nome: "Malu Oliveira",
        imagem: "9700_4_04.jpg",
        minibio: "Malu é uma iniciante na programação e adora aprender novas tecnologias."
    })
}

function mostraPorta() {
    console.log("Servidor criado e rodando na porta: ", porta);
}

app.use(router.get("/mulher", mostraMulher))
app.listen(porta, mostraPorta);

