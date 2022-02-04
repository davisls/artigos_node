const Cadastro = require('../models/CadastroModel');

exports.index = async (req, res) => {
    const noticias = await Cadastro.listaNoticia();
    res.render('index', { noticias });
};