/**Responsável API*/
const tarefasService = require('../services/tarefasService')

/*O json busca os dados p/ pagina web.
Função buscarTodos*/
module.exports = {
    buscarTodos: async (req, res) => {
        let json = {error:'', result: []}

        let tarefas = await tarefasService.buscarTodos()

        for(let i in tarefas){
            json.result.push({
                condigo: tarefas[i].condigo,
                descricao: tarefas[i].tituloTarefa,
                dataEntrega: tarefas[i].dataEntrega
            })
        }
        
        res.json(json)
    },

    buscarUm: async (req, res) => {
        let json = {error:'', result: {}}

        let codigo = req.params.codigo
        let tituloTarefa = await tarefasService.buscarUm(codigo)

        if (tituloTarefa) {
            json.result = tituloTarefa
        }

        res.json(json)
    },

    inserir: async (req, res) => {
        let json = {error:'', result: {}};

        let tituloTarefa = req.body.tituloTarefa;
        let dataEntrega = req.body.dataEntrega;

        if(tituloTarefa && dataEntrega) {
            let tarefaCodigo = await tarefasService.inserir(tituloTarefa, dataEntrega);
            json.result = {
                codigo: tarefaCodigo,
                tituloTarefa,
                dataEntrega
            };
        }else{
            json.error = 'Campos não enviados';
        };
        
        res.json(json);
    },

    alterar: async(req, res) => {
        let json = {error:'', result:{}};

        let codigo = req.params.codigo
        let tituloTarefa = req.body.tituloTarefa
        let dataEntrega = req.body.dataEntrega

        if(codigo && tituloTarefa && dataEntrega) {
            await tarefasService.alterar(codigo, tituloTarefa, dataEntrega)
            json.result = {
                codigo,
                tituloTarefa,
                dataEntrega
            }
        }else{
            json.error = 'Campos não enviados'
        }
        res.json(json)
    },

    excluir: async(req,res) => {
        let json = {error:'', result: {}}

        await tarefasService.excluir(req.params.codigo)

        res.json(json)
    } 
}