const res = require('express/lib/response');
const mongoose = require('mongoose');

const CadastroSchema = new mongoose.Schema({
    titulo: { type: String, required: true },
    descricao: { type: String, required: true }
});

const CadastroModel = mongoose.model('Cadastro', CadastroSchema);

class Cadastro {

    constructor(body){
        this.body = body;
        this.errors = [];
        this.noticia = null;
    }

    async register(){
        this.valida()
        if(this.errors.length > 0) return;

        try{
            this.noticia = await CadastroModel.create(this.body);
        } catch (e) {
            console.log(e);
            res.render('404Error');
        }
        
    }

    valida(){
        this.cleanUp();
        if(!this.body.titulo) this.errors.push('O Título precisa ser preenchido');
        if(!this.body.descricao) this.errors.push('A Notícia precisa ser preenchido');
    }

    cleanUp(){
        this.body = {
            titulo: this.body.titulo,
            descricao: this.body.descricao
        }
    }

    static async listaNoticia() {
        const noticias = await CadastroModel.find().sort();
        return noticias;
    }

    static async buscaNoticia(busca) {
        const noticias = await CadastroModel.find({
            $or: [{ titulo: { $regex: busca, $options: "i" } }, 
                  { descricao: { $regex: busca, $options: "i" } }]
            });
        return noticias;
    }   
}

module.exports = Cadastro;
