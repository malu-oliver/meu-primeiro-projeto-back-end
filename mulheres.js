const express = require("express"); //aqui iniciando o express
const router = express.Router(); //aqui iniciando o router do express
const cors = require('cors'); //aqui importando o cors, permite consumir esta API no frontend


const conectDatabase = require('./DataBase') //aqui importando a função de conexão com o banco de dados
conectDatabase(); //aqui conectando com o banco de dados

const Mulher = require('./mulherModel') //aqui importando o modelo de mulher

const app = express(); //aqui iniciando o app do express
app.use(express.json()); //aqui dizendo para o app usar json
app.use(cors()); //aqui dizendo para o app usar o cors


const porta = 3333; //aqui definindo a porta


// GET: aqui criando a função para mostrar as mulheres
async function mostraMulheres(request,response) {
    try {
        const mulheresVindasDoBancoDeDados = await Mulher.find() //aqui buscando as mulheres no banco de dados
        response.jason(mulheresVindasDoBancoDeDados) //aqui mostrando as mulheres

    }catch (erro) {
        console.log(erro)
    }
    
}

// aqui criando a função para mostrar a porta
function mostraPorta() {
    console.log("Servidor criado e rodando na porta: ", porta);
}

// POST: aqui criando a função para criar uma nova mulher
async function criaMulher(request,response) {
    const novaMulher  = new Mulher({
        nome: request.body.nome,
        imagem: request.body.imagem,
        minibio: request.body.minibio,
        citacao: request.body.citacao
    })
    try{
        const mulherCriada = await novaMulher.save() //aqui salvando a nova mulher no banco de dados  
        response.status(201).json(mulherCriada) //aqui mostrando a mulher criada
    }catch(erro){
        console.log(erro)
    }
}

// PATCH: aqui criando a função para corrigir uma mulher
async function corrigeMulher(request,response) {
    try{
        const mulherEncontrada = await Mulher.findById(request.params.id) //aqui buscando a mulher no banco de dados
        if(request.body.nome){
            mulherEncontrada.nome = request.body.nome
        }
        if(request.body.imagem){
            mulherEncontrada.imagem = request.body.imagem
        }
        if(request.body.minibio){
            mulherEncontrada.minibio = request.body.minibio
        }
        if(request.body.citacao){
            mulherEncontrada.citacao = request.body.citacao
        }

        const mulherAtualizada  = await mulherEncontrada.save() //aqui salvando a mulher atualizada no banco de dados
        response.json(mulherAtualizada)

    } catch(erro){
        console.log(erro)
    }
}
// DELETE: aqui criando a função para deletar uma mulher
async function deletaMulher(request,response) {
    try{
        await Mulher.findByIdAndDelete(request.params.id) //aqui deletando a mulher no banco de dados
        response.json({mensagem: "Mulher deletada com sucesso!"})

    } catch(erro){
        console.log(erro)
    }
}

app.use(router.get("/mulheres", mostraMulheres)) //rota GET para mostrar as mulheres
app.use(router.post("/mulheres", criaMulher)) //rota POST para criar uma nova mulher
app.use(router.patch("/mulheres/:id", corrigeMulher)) //rota PATCH para corrigir uma mulher
app.use(router.delete("/mulheres/:id", deletaMulher)) //rota DELETE para deletar uma mulher

app.listen(porta, mostraPorta); //servidor ouvindo a porta

