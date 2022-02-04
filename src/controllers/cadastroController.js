const Cadastro = require('../models/CadastroModel');

exports.cadastrar = (req, res) => {
    res.render('cadastra');
};

exports.cadastro = async (req, res) => {
    try {
        const noticia = await new Cadastro(req.body);
        noticia.register();
    
        if(noticia.errors.length > 0){
            req.flash('errors', noticia.errors);
            req.session.save(() => {
                res.redirect('/cadastra')
            })
        } else {
            req.flash('success', 'Notícia cadastrada com sucesso.');
            req.session.save(() => {
                res.redirect('/cadastra');   
            })
        } 
    } catch (e) {
        console.log(e);
        res.render('404Error');
    }

}

exports.buscar = async (req, res, next) => {
    const noticias = await Cadastro.buscaNoticia(req.query.search);
    res.render('index', { noticias });    
}
