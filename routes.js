const express = require('express');
const route = express.Router();
const HomeController = require('./src/controllers/HomeController');
const cadastroController = require('./src/controllers/cadastroController');

// REQ => São os dados passados pelo usuário na requisição;
// RES => É a resposta enviado ao usuário pela aplicação.
// req.params.(nome do parametro) || req.query['(nome do parametro)'];

route.get('/', HomeController.index);

//Rotas de Cadastro
route.get('/cadastra', cadastroController.cadastrar);
route.post('/cadastro/index', cadastroController.cadastro);
route.get('/noticia/busca', cadastroController.buscar);


module.exports = route;
