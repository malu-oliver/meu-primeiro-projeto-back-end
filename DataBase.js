const mongoose = require('mongoose');
require ('dotenv').config();

async function conectDatabase() {
    try{
            console.log('Conexão com banco de dados iniciada...');

    await mongoose.connect(process.env.MONGO_URL);
    console.log('Banco de dados conectado com sucesso!');
    } catch(erro){
    console.log('Erro ao conectar com o banco de dados: ', erro);
    }
}   
module.exports = conectDatabase;